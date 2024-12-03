import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import { debounce } from "@src/utils/utils";

import { SearchIcon } from "@icons/SearchIcon";

import "./Search.css";

const DELAY_MS = 600;

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const inpValue = searchParams.get("search") ?? "";

  const debouncedChange = debounce((inputValue: string) => {
    setSearchParams({ search: inputValue });
  }, DELAY_MS);

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    debouncedChange(value);
  };

  return (
    <TextField
      sx={{ maxWidth: "18.75rem", width: "100%" }}
      variant="standard"
      placeholder="Search products"
      className="search-input"
      defaultValue={inpValue}
      onChange={handleChange}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
