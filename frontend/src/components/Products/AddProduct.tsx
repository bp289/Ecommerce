import { Card, Input, Typography, Button } from "@material-tailwind/react";

import { useState } from "react";

import Header from "../Header";

type Props = {};

const AddProduct = (props: Props) => {
  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  async function addProduct() {
    const formData = new FormData();

    formData.append("file", file!);
    formData.append("price", price);
    formData.append("name", name);
    formData.append("description", description);

    const result = await fetch("http://localhost:8000/api/addProduct", {
      method: "POST",
      body: formData,
    });

    const resultJson = await JSON.stringify(result);
    alert(resultJson);
  }
  return (
    <div>
      <Header />
      <Typography variant="h1">Add products</Typography>
      <Card>
        <Input
          label="name"
          crossOrigin={undefined}
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
        ></Input>

        <Input
          label="price"
          crossOrigin={undefined}
          type="text"
          className="form-control"
          onChange={(e) => setPrice(e.target.value)}
        ></Input>
        <Input
          label="description"
          crossOrigin={undefined}
          type="text"
          className="form-control"
          onChange={(e) => setDescription(e.target.value)}
        ></Input>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files![0])}
        ></input>
        <Button onClick={addProduct}>Add Item</Button>
      </Card>
    </div>
  );
};

export default AddProduct;
