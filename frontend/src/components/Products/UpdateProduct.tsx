import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
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

  const [name, setName] = useState<string>(data.name);
  const [file, setFile] = useState<File>();
  const [price, setPrice] = useState<string>(data.price);
  const [description, setDescription] = useState<string>(data.description);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const { id } = useParams();

  async function updateProduct() {
    try {
      const formData = new FormData();

      formData.append("file", file!);
      formData.append("price", price);
      formData.append("name", name);
      formData.append("description", description);

      const result = await fetch("http://localhost:8000/api/addProduct", {
        method: "POST",
        body: formData,
      });

      if (result.ok) {
        setAlertMessage("success, Item added");
        setAlertOpen(true);
      } else {
        const resultJson = await result.json();
        setAlertMessage(`item creation failed ${JSON.stringify(resultJson)}`);
        setAlertOpen(true);
      }
    } catch (e) {
      setAlertMessage(`item creation failed ${e}`);
      setAlertOpen(true);
    }
  }

  const fetchProductDetails = async (id: string) => {
    const result = await fetch(`http://localhost:8000/api/product/${id}`);
    const resultJson = await result.json();
    setData(resultJson);
  };
  //
  useEffect(() => {
    fetchProductDetails(id!);
  }, [id]);

  return (
    <>
      <Dialog open={alertOpen} handler={setAlertOpen}>
        <DialogHeader>Alert</DialogHeader>
        <DialogBody> {alertMessage}</DialogBody>
        <DialogFooter>
          <Button
            className="rounded-full"
            variant="gradient"
            onClick={() => setAlertOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </Dialog>
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
              onChange={(e) => setName(e.target.value)}
              className="form-control"
            ></Input>

            <Input
              label="price"
              crossOrigin={undefined}
              type="text"
              className="form-control"
              defaultValue={data!.price}
              onChange={(e) => setPrice(e.target.value)}
            ></Input>
            <Input
              label="description"
              crossOrigin={undefined}
              type="text"
              defaultValue={data!.description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
            ></Input>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files![0])}
              defaultValue={data!.file_path}
            ></input>
            <img
              className=" h-[400px] w-[400px]"
              alt="file"
              src={"http://localhost:8000/" + data!.file_path}
            ></img>
            <Button onClick={updateProduct}>Update Item</Button>
          </Card>
        </>
      )}
    </>
  );
};

export default UpdateProduct;
