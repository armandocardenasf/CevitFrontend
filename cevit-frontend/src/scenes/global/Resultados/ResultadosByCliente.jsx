import { Box, Pagination, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { RutaApi } from "../../../api/url";
import CardDisplay from "../../../components/CardDisplay";
import usePagination from "../../../components/UsePagination";
import SearchBar from "../../../components/SearchBar";
import { FiltroAnalisis } from "../../../components/utils/FiltroAnalisis";
import { useLocation } from "react-router-dom";
import RadioSearch from "../../../components/RadioSearch";
const ResultadosByCliente = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCampo, setSearchCampo] = useState("");
  const { state: data } = useLocation();
  let [page, setPage] = useState(1);
  const [resultados, setResultados] = useState([]);
  useEffect(() => {
    RutaApi.post("/resultados/byClienteId", { oClienteId: data.id }).then(
      (resultado) => setResultados(resultado.data[0])
    );
  }, []);
  const filterData = FiltroAnalisis(searchQuery, resultados, searchCampo);
  const PER_PAGE = 12;
  const count = Math.ceil(filterData.length / PER_PAGE);
  const _DATA = usePagination(filterData, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <>
      <Box m="20px">
        <Header title="Resultados" subtitle={"Cliente: " + data.nombre} />
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setSearchCampo={setSearchCampo}
        />
        <RadioSearch
          setSearchQuery={setSearchQuery}
          setSearchCampo={setSearchCampo}
        />
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

export default ResultadosByCliente;
