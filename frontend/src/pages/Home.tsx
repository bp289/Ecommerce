import React from "react";

import { Button, Typography } from "@material-tailwind/react";

export function ButtonDefault() {
  return <Button>Button</Button>;
}

type Props = {};

const Home = (props: Props) => {
  return (
    <Typography className="text-center" variant="h1">
      Hello
    </Typography>
  );
};

export default Home;
