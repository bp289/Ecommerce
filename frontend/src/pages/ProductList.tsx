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
}

const ProductList = (props: Props) => {
  const [data, setData] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const result = await fetch("http://localhost:8000/api/list");
    const resultJson = await result.json();
    setData(resultJson);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <Header />

      <Typography variant="h2">Product List</Typography>
      <div className=" transition flex gap-20 flex-col lg:flex-row">
        {data.map((item, index) => (
          <ProductCard
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
