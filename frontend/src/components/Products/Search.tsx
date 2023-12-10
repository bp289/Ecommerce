import { Input, Button } from "@material-tailwind/react";
import React, { useState } from "react";

type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const Search = ({ search, setSearch }: Props) => {
  const [term, setTerm] = useState("");
  return (
    <div className="mb-1 flex gap-6 m-auto">
      <Input
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
      <Button onClick={() => setSearch(term)}>Search</Button>
    </div>
  );
};

export default Search;
