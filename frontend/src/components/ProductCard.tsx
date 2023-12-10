import {
  Chip,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";

type Props = {
  name: string;
  description: string;
  price: string;
  image: string;
};

const ProductCard = ({ name, description, price, image }: Props) => {
  return (
    <Card className="mt-6 w-96">
      <CardHeader
        floated={false}
        color="blue-gray"
        className="relative h-[460px]"
      >
        <img
          className="object-cover h-full w-full"
          src={`http://localhost:8000/${image}`}
          alt="card"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {name}
        </Typography>
        <Typography>{description}</Typography>
      </CardBody>
      <CardFooter className="flex justify-end pt-0">
        <Chip className="w-fit" value={price} variant="ghost" />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
