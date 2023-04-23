import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { RutaApi } from "../../../api/url";
import CardDisplay from "../../../components/CardDisplay";
import usePagination from "../../../components/UsePagination";
import SearchBar from "../../../components/SearchBar";
import { FiltroAnalisis } from "../../../components/utils/FiltroAnalisis";
import { useLocation } from "react-router-dom";

const ResultadosByCliente = () => {
  const [searchQuery, setSearchQuery] = useState("");
  let [page, setPage] = useState(1);

  const [type, setType] = useState(-1);
  const [revision, setRevision] = useState(-1);
  const [results, setResults] = useState([]);

  useEffect(() => {
    RutaApi.get("/resultados").then((resultado) =>
      setResults(resultado.data[0])
    );
  }, []);

  const filterResults = (searchedText, results) => {
    const filteredResults = results.filter((value) => {
      if (!String(value.rMuestra).includes(searchedText)) {
        return false;
      } else if (type >= 0 && value.rTipoMuestra !== type) {
        return false;
      }
      // the revision may fetch directly from db on change. Thus, don't need to implement in frontend.

      // else if(revision >= 0 && value.rEnviado !== revision) {
      //   return false;
      // }
      return true;
    });

    return filteredResults;
  };

  const filterData = filterResults(searchQuery, results);
  const PER_PAGE = 12;
  const count = Math.ceil(filterData.length / PER_PAGE);
  const _DATA = usePagination(filterData, PER_PAGE);

  const handleChangePagination = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleChangeRevision = (event) => {
    setRevision(event.target.value);
  };

  return (
    <>
      <Header title="Resultados" subtitle="Analisis registrados" />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Box sx={{ display: "flex", my: 2, gap: 1 }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="input-type-select-label">Tipo</InputLabel>
          <Select
            labelId="type-select-label"
            id="type-select"
            value={type}
            label="Tipo"
            onChange={handleChangeType}
          >
            <MenuItem value={-1}>Todos</MenuItem>
            <MenuItem value={0}>Mosto</MenuItem>
            <MenuItem value={1}>Vino</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="input-revision-select-label">Revisión</InputLabel>
          <Select
            labelId="revision-select-label"
            id="revision-select"
            value={revision}
            label="Revisión"
            onChange={handleChangeRevision}
          >
            <MenuItem value={-1}>Todos</MenuItem>
            <MenuItem value={0}>Revisión pendiente</MenuItem>
            <MenuItem value={1}>Revisión media</MenuItem>
            <MenuItem value={1}>Revisión total</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChangePagination}
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
        onChange={handleChangePagination}
      />
    </>
  );
};

export default ResultadosByCliente;
