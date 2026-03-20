/*
 * SearchBox
 * - Reusable search input (controlled or uncontrolled).
 * - Submits on Enter.
 */
"use client";

import React from "react";

type SearchBoxProps = {
  searchBreedTerm?: string;
  onSearch: (query: string) => void;
  placeholder?: string;
};

const SEARCH_BUTTON_TYPE_SUBMIT = "submit" as const;

/**
 * SearchBox renders an accessible search textbox with optional clear and submit support.
 */
export default function SearchBox(props: SearchBoxProps): React.JSX.Element {
  const { searchBreedTerm, onSearch, placeholder } = props;

  const inputClassName: string =
    "block w-full rounded-md border-0 bg-transparent px-0 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none disabled:cursor-not-allowed disabled:opacity-60";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onSearch(event.target.value);
  };

  const ariaLabel: string = "Search";

  return (
    <form aria-labelledby={searchBreedTerm}>
      <label id={searchBreedTerm} className="sr-only">
        {ariaLabel}
      </label>
      <input
        aria-label={ariaLabel}
        className={inputClassName}
        type="search"
        value={searchBreedTerm}
        placeholder={placeholder ?? "Search..."}
        onChange={handleChange}
      />

      <button type={SEARCH_BUTTON_TYPE_SUBMIT} className="sr-only">
        Search
      </button>
    </form>
  );
}
