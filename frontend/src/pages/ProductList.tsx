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

interface userInfo {
  id: number;
}

const ProductList = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const userInfo = JSON.parse(
      localStorage.getItem("user-info") as string
    ) as userInfo;
    console.log(userInfo["id"]);
    const result = await fetch(`http://localhost:8000/api/list/${userInfo.id}`);
    const resultJson = await result.json();
    console.log(resultJson);
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
    if (!search) {
      fetchProducts();
    } else {
      performSearch(search);
    }
  }, [search]);

  return (
    <>
      <Header />
      <div className="max-w-[1700px] mx-auto md:max-w-[1700px]">
        <div className="flex mt-12 mx-10 md:mx-auto justify-between flex-wrap">
          <div>
            <Typography variant="h2">Your Product Listings</Typography>
          </div>

          <Search search={search} setSearch={setSearch} />
        </div>

        <div className="flex flex-wrap justify-start  gap-7  mt-8 flex-row">
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
      </div>
    </>
  );
};

export default ProductList;
