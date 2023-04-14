import { Box, Pagination, Stack, TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { RutaApi } from "../../api/url";
import CardDisplay from "../../components/CardDisplay";
const Resultados = () => {
  const [loading, setLoading] = useState(false);
  let [movieCard, setmovieCard] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);
  useEffect(() => {
    const getAnalisis = async () => {
      setLoading(true);
      RutaApi.get("/resultados").then((analisis) =>
        setmovieCard(analisis.data[0])
      );
      setLoading(false);
    };

    getAnalisis();
  }, [currentPage]);

  // Get currCards
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = movieCard.slice(indexOfFirstCard, indexOfLastCard);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Box m="20px">
        <Header title="Resultados" subtitle="Analisis registrados" />
        <Stack
          direction={"row"}
          justifyContent="space-between"
          style={{ padding: "20px" }}
        >
          <CardDisplay analisis={currentCards} loading={loading} />
        </Stack>
        <Stack
          direction={"row"}
          justifyContent="space-between"
          style={{ padding: "20px" }}
        >
          <Pagination count={10} page={currentPage} onChange={handleChange} />
        </Stack>
      </Box>
    </>
  );
};

export default Resultados;
