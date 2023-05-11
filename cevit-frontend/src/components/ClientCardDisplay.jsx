import { Container, Grid } from "@mui/material";
import React from "react";
import ClientCardResultados from "./ClientCardResultados";

const ClientCardDisplay = ({ analisis }) => {
  return (
    <>
      <Container sx={{ py: 2 }}>
        <Grid container spacing={4}>
          {analisis.map((oData) => {
            return (
              <Grid item xs={1} sm={2} md={3} key={oData.ID}>
                <ClientCardResultados oResultado={oData} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default ClientCardDisplay;
