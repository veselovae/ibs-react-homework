import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";

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
    <div className="search-box">
      <input
        type="text"
        placeholder="Search products"
        className="search-input"
        defaultValue={inpValue}
        onChange={handleChange}
      />
      <SearchIcon />
    </div>
  );
};
