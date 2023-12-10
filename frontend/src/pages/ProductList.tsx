import { Typography } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";

type Props = {};

interface Product {
  name: string;
  description: string;
  file_path: string;
  price: string;
  id: number;
}

const ProductList = (props: Props) => {
  const [data, setData] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const result = await fetch("http://localhost:8000/api/list");
    const resultJson = await result.json();
    console.log(resultJson);
    setData(resultJson);
  };

  const deleteProduct = async (id: number) => {
    const result = await fetch(`http://localhost:8000/api/delete/${id}`, {
      method: "DELETE",
    });

    const resultJson = await result.json();
    console.warn(result);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <Header />

      <Typography className="ml-8 mt-12" variant="h2">
        Product Listing
      </Typography>
      <div className="flex flex-wrap gap-20 flex-row">
        {data.map((item, index) => (
          <ProductCard
            id={item.id}
            onDelete={deleteProduct}
            image={item.file_path}
            description={item.description}
            price={`$ ${item.price}`}
            name={item.name}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;
