import React from "react";

import { Button, Typography } from "@material-tailwind/react";
import Header from "../components/Header";

export function ButtonDefault() {
  return <Button>Button</Button>;
}

type Props = {};

const Home = (props: Props) => {
  return (
    <>
      <Header />
      <Typography className="text-center" variant="h1">
        Hello
      </Typography>
    </>
  );
};

export default Home;
