import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

const SearchBar = ({ setSearchQuery }) => {
  return (
    <form>
      <TextField
        id="search-bar"
        className="text"
        onInput={(e) => {
          setSearchQuery(e.target.value);
        }}
        label="Búsqueda por folio"
        variant="outlined"
        placeholder="Ingresar folio..."
        size="small"
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon style={{ fill: "blue" }} />
      </IconButton>
    </form>
  );
};

export default SearchBar;
