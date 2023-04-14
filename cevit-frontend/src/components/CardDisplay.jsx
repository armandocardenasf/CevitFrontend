import Masonry from "@mui/lab/Masonry/Masonry";
import { useMediaQuery } from "@mui/material";
import React from "react";
import CardResultados from "./CardResultados";

const CardDisplay = ({ analisis, loading }) => {
  const mobile = useMediaQuery("(max-width:1200px)");

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Masonry columns={!mobile ? 4 : 1}>
      {analisis.map((resultado) => (
        <CardResultados oResultado={resultado} />
      ))}
    </Masonry>
  );
};

export default CardDisplay;
