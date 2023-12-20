import {
  Input,
  Typography,
  Button,
  Textarea,
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
      <div className="max-w-[1700px] lg:mx-auto mt-12 mb-6 md:max-w-[1700px]">
        <Typography variant="h1">Item Details</Typography>
        <div className="flex flex-col justify-start items-start md:w-[50rem] gap-10">
          <div className="flex flex-col justify-start items-start md:w-[50rem] gap-10">
            {" "}
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
              type="number"
              className="form-control"
              onChange={(e) => setPrice(e.target.value)}
            ></Input>
          </div>
          <Textarea
            resize={true}
            label="description"
            className="form-control m-auto"
            onChange={(e) => setDescription(e.target.value)}
          ></Textarea>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files![0])}
          ></input>
          <Button onClick={addProduct}>List item</Button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
