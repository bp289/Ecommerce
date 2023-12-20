import { Input, Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { SunIcon } from "@heroicons/react/20/solid";
type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const Search = ({ search, setSearch }: Props) => {
  const [term, setTerm] = useState("");
  return (
    <div className=" mt-12 w-full lg:w-[50rem] mb-1 flex flex-col lg:flex-row lg:mt-0 items-center gap-6 ">
      <Input
        className="flex-grow w-full"
        crossOrigin={undefined}
        value={term}
        type="text"
        label="Search"
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            setSearch(term);
          }
        }}
        onChange={(e) => {
          setTerm(e.target.value);
        }}
      />
      <Button className="w-full lg:w-24" onClick={() => setSearch(term)}>
        Search
      </Button>
    </div>
  );
};

export default Search;
