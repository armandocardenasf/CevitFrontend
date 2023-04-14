import { Box, Pagination, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { RutaApi } from "../../api/url";
import CardDisplay from "../../components/CardDisplay";
import usePagination from "../../components/UsePagination";
const Resultados = () => {
  let [page, setPage] = useState(1);
  const [resultados, setResultados] = useState([]);
  useEffect(() => {
    RutaApi.get("/resultados").then((resultado) =>
      setResultados(resultado.data[0])
    );
  }, []);
  const PER_PAGE = 9;
  const count = Math.ceil(resultados.length / PER_PAGE);
  const _DATA = usePagination(resultados, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  return (
    <>
      <Box m="20px">
        <Header title="Resultados" subtitle="Analisis registrados" />
        <Pagination
          count={count}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
        <Stack
          direction={"row"}
          justifyContent="space-between"
          style={{ padding: "20px" }}
        >
          <CardDisplay analisis={_DATA.currentData()} />
        </Stack>

        <Pagination
          count={count}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </Box>
    </>
  );
};

export default Resultados;
