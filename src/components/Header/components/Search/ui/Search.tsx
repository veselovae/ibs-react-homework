import { ChangeEvent, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { debounce } from "@src/utils/utils";

import { SearchIcon } from "@icons/SearchIcon";

import "./Search.css";

const DELAY_MS = 600;

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const updateSearchParam = (searchParam: string) => {
    setSearchParams({ search: searchParam });
  };

  const initInpValue = searchParams.get("search") || "";
  const [inpValue, setInpValue] = useState(initInpValue);

  const debouncedChange = debounce((inputValue: string) => {
    updateSearchParam(inputValue);
  }, DELAY_MS);

  const updateCatalog = useCallback((val: string) => debouncedChange(val), []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInpValue(inputValue);
    updateCatalog(inputValue);
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search products"
        className="search-input"
        value={inpValue}
        onChange={handleChange}
      />
      <SearchIcon />
    </div>
  );
};
