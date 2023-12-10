import {
  Card,
  Input,
  Typography,
  Button,
  Alert,
  Dialog,
  DialogFooter,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";

import { useState } from "react";

import Header from "../components/Header";

type Props = {};

const AddProduct = (props: Props) => {
  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  async function addProduct() {
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
    </>
  );
};

export default AddProduct;
