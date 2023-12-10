<?php

namespace App\Http\Controllers;

use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use App\Models\Product;


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
}
