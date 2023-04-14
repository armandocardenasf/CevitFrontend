import Masonry from "@mui/lab/Masonry/Masonry";
import { useMediaQuery } from "@mui/material";
import React from "react";
import CardResultados from "./CardResultados";

const CardDisplay = ({ analisis }) => {
  const mobile = useMediaQuery("(max-width:1200px)");
  return (
    <Masonry columns={!mobile ? 4 : 1}>
      {analisis.map((oData) => {
        return <CardResultados oResultado={oData} />;
      })}
    </Masonry>
  );
};

export default CardDisplay;
