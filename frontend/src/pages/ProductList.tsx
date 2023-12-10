import { Typography } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Search from "../components/Products/Search";

type Props = {};

interface Product {
  name: string;
  description: string;
  file_path: string;
  price: string;
  id: number;
}

const ProductList = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const result = await fetch("http://localhost:8000/api/list");
    const resultJson = await result.json();

    setData(resultJson);
  };

  const deleteProduct = async (id: number) => {
    const result = await fetch(`http://localhost:8000/api/delete/${id}`, {
      method: "DELETE",
    });

    console.warn(result);
    fetchProducts();
  };

  async function performSearch(key: string) {
    console.log(key);
    const result = await fetch("http://localhost:8000/api/search/" + key);
    const resultJson = await result.json();
    setData(resultJson);
    setData(resultJson);
  }

  useEffect(() => {
    console.log(search);
    if (!search) {
      fetchProducts();
    } else {
      performSearch(search);
    }
  }, [search]);

  return (
    <>
      <Header />

      <Typography className="ml-8 mt-12" variant="h2">
        Product Listing
      </Typography>

      <Search search={search} setSearch={setSearch} />
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
