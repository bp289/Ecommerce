<?php

namespace App\Http\Controllers;

use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    function addProduct(Request $req) {

        try {
        $validated = $req->validate([
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
            'file' => 'required|file',
        ]);

        $product = new Product();
        $product->name = $validated['name'];
        $product->price = $validated['price'];
        $product->description = $validated['description'];
        $product->file_path = $req->file('file')->store('products');
        $product->save();

        return response('Product Created succesfully', 200);
        } catch (ValidationException $e) {

            $message = $e->errors();
            return response($message, 400);
        }

    }

    function list(){
        return Product::all();
    }

    function delete($id){

        $result= Product::where('id',$id)->delete();
        if($result){
            return ["message"=> "product ${id} has been deleted"];
        }else{
            return["message"=> "operation failed for product ${id}"];
        }

    }

    function getProduct($id){
        return Product::find($id);
    }

    function updateProduct($id, Request $req){ 

        try {
            $product = Product::find($id);

            $oldFilePath = $product->file_path;

            if ($req->has('name') && !empty($req->input('name'))) {
                $product->name = $req->input('name');
            }
            if ($req->has('price') && !empty($req->input('price'))) {
                $product->price = $req->input('price');
            }

            if ($req->has('description') && !empty($req->input('description'))) {
                $product->description = $req->input('description');
            }

            // Check if the file input exists and is a valid file
            if ($req->hasFile('file') && $req->file('file')->isValid()) {
                $product->file_path = $req->file('file')->store('products');
                if (!empty($oldFilePath) && Storage::exists($oldFilePath)) {
                    Storage::delete($oldFilePath);
                }
            }

            // Save the product only if at least one field is updated
            if ($product->isDirty()) {
                $product->save();
            }

        return response('Product Created succesfully', 200);
        } catch (ValidationException $e) {

            $message = $e->errors();
            return response($message, 400);
        }
   
    }

    function search($key){
        return Product::where('name', 'Like',"%$key%")->get();
    }
}
