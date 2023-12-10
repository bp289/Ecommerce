import {
  Chip,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import DeleteDialog from "./DeleteDialog";
import { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  onDelete: (id: number) => void;
};

const ProductCard = ({
  id,
  name,
  description,
  price,
  image,
  onDelete,
}: Props) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState<boolean>(false);

  const handleOpen = () => setOpenAccordion((prev) => !prev);
  return (
    <>
      <DeleteDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onDelete={onDelete}
        name={name}
        id={id}
      />
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
          <Typography
            variant="h5"
            color="blue-gray"
            className=" flex justify-between mb-2"
          >
            {name}
            <Chip className="w-fit" value={price} variant="ghost" />
          </Typography>
          <Accordion open={openAccordion} icon={<Icon open={openAccordion} />}>
            <AccordionHeader onClick={() => handleOpen()}>
              Description
            </AccordionHeader>
            <AccordionBody className="max-h-80 overflow-scroll">
              {description}
            </AccordionBody>
          </Accordion>
        </CardBody>
        <CardFooter className="flex justify-between pt-0">
          <div>
            <button onClick={() => setOpenDialog(true)}>
              <TrashIcon className="h-8 w-8 hover:text-red-400 hover:cursor-pointer hover:scale-110 hover:rotate-12 transition-transform duration-300" />
            </button>
          </div>
          <div>
            <button onClick={() => setOpenDialog(true)}>
              <Link to={"/update/" + id}>
                <PencilSquareIcon className="h-8 w-8 hover:text-blue-400 hover:cursor-pointer hover:scale-110 hover:rotate-12 transition-transform duration-300" />
              </Link>
            </button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

interface IconProps {
  open: boolean;
}

function Icon({ open }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export default ProductCard;
