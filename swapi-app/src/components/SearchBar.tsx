import React from "react";

type Props = {
  inputValue: string;
  onInputChange: (val: string) => void;
  onSearch: () => void;
};

export const SearchBar: React.FC<Props> = ({
  inputValue,
  onInputChange,
  onSearch,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch();
    }
  };

  return (
    <form
      className="input-group mb-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
    >
      <input
        type="text"
        className="form-control"
        placeholder="Search characters..."
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="btn btn-yellow text-dark" type="submit">
        Search
      </button>
    </form>
  );
};
