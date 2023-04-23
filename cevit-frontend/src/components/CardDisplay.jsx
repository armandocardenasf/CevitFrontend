import { Container, Grid } from "@mui/material";
import React, { useState } from "react";
import CardResultados from "./CardResultados";
import SearchBar from "./SearchBar";

const CardDisplay = ({ analisis }) => {
  return (
    <>
      <Container sx={{ py: 2 }} maxWidth="xl">
        <Grid container spacing={4}>
          {analisis.map((oData) => {
            return (
              <Grid item xs={2} sm={3} md={3}>
                <CardResultados oResultado={oData} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default CardDisplay;
