import { Typography } from "@material-tailwind/react";
import React from "react";
import Header from "../Header";

type Props = {};

const UpdateProduct = (props: Props) => {
  return (
    <div>
      <Header />
      <Typography variant="h1">Update products</Typography>
    </div>
  );
};

export default UpdateProduct;
