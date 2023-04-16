import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";

const RadioSearch = ({ setSearchQuery, setSearchCampo }) => {
  const handleChange = (event) => {
    if (event.target.value === "VINO") {
      setSearchQuery("1");
      setSearchCampo("rTipoMuestra");
    } else if (event.target.value === "MOSTO") {
      setSearchQuery("0");
      setSearchCampo("rTipoMuestra");
    } else if (
      event.target.value === "0" ||
      event.target.value === "1" ||
      event.target.value === "2"
    ) {
      setSearchQuery(event.target.value);
      setSearchCampo("rEnviado");
    }
  };
  return (
    <>
      <FormLabel id="radio-search">FILTROS</FormLabel>
      <RadioGroup
        row
        aria-labelledby="radio-search"
        name="row-radio-buttons-group"
        onChange={handleChange}
      >
        <FormControlLabel
          value="0"
          control={<Radio />}
          label="REVISION PENDIENTE"
        />
        <FormControlLabel
          value="1"
          control={<Radio />}
          label="REVISION MEDIA"
        />
        <FormControlLabel
          value="2"
          control={<Radio />}
          label="REVISION TOTAL"
        />
        <FormControlLabel value="VINO" control={<Radio />} label="VINOS" />
        <FormControlLabel value="MOSTO" control={<Radio />} label="MOSTOS" />
      </RadioGroup>
    </>
  );
};

export default RadioSearch;
