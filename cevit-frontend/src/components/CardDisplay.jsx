import { Container, Grid } from "@mui/material";
import React from "react";
import CardResultados from "./CardResultados";

const CardDisplay = ({ analisis }) => {
  return (
    <>
      <Container sx={{ py: 2 }}>
        <Grid container spacing={4}>
          {analisis.map((oData) => {
            return (
              <Grid item md={6} lg={4} xl={3} key={oData.ID}>
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
