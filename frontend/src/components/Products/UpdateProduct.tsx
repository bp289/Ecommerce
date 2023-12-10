import { Button, Card, Input, Typography } from "@material-tailwind/react";
import Header from "../Header";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
type Props = {};

interface Product {
  name: string;
  description: string;
  file_path: string;
  price: string;
  id: number;
}
const UpdateProduct = (props: Props) => {
  const [data, setData] = useState<Product>({} as Product);
  const { id } = useParams();

  const fetchProductDetails = async (id: string) => {
    const result = await fetch(`http://localhost:8000/api/product/${id}`);
    const resultJson = await result.json();
    console.log(resultJson);
    setData(resultJson);
  };

  useEffect(() => {
    fetchProductDetails(id!);
  }, [id]);

  return (
    <>
      <Header />

      {data && (
        <>
          <Typography variant="h1">Update {data.id}</Typography>
          <Card>
            <Input
              label="name"
              crossOrigin={undefined}
              type="text"
              defaultValue={data!.name}
              className="form-control"
            ></Input>

            <Input
              label="price"
              crossOrigin={undefined}
              type="text"
              className="form-control"
              defaultValue={data!.price}
            ></Input>
            <Input
              label="description"
              crossOrigin={undefined}
              type="text"
              defaultValue={data!.description}
              className="form-control"
            ></Input>
            <input type="file" defaultValue={data!.file_path}></input>
            <img
              className=" h-[400px] w-[400px]"
              alt="file"
              src={"http://localhost:8000/" + data!.file_path}
            ></img>
            <Button>Update Item</Button>
          </Card>
        </>
      )}
    </>
  );
};

export default UpdateProduct;
