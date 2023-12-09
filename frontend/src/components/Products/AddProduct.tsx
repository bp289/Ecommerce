import { Typography } from "@material-tailwind/react";
import React from "react";
import Header from "../Header";

type Props = {};

const AddProduct = (props: Props) => {
  return (
    <div>
      <Header />
      <Typography variant="h1">Add products</Typography>
    </div>
  );
};

export default AddProduct;
