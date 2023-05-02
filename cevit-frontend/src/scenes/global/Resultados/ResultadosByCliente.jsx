import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { RutaApi } from "../../../api/url";
import CardDisplay from "../../../components/CardDisplay";
import usePagination from "../../../components/UsePagination";
import SearchBar from "../../../components/SearchBar";
import { useLocation } from "react-router-dom";

const Resultados = () => {
  const [searchQuery, setSearchQuery] = useState("");
  let [page, setPage] = useState(1);
  const { state: data } = useLocation();
  const [type, setType] = useState(-1);
  const [revision, setRevision] = useState(0);
  const [byFecha, setByFecha] = useState("");
  const [byFechaMuestreo, setByFechaMuestreo] = useState("");
  const [recepcion, setRecepcion] = useState([]);

  useEffect(() => {
    RutaApi.post("/recepcion/byCliente", { oClienteID: data.id }).then(
      (resultado) => setRecepcion(resultado.data[0])
    );
  }, []);
  const filterResults = (searchedText, results) => {
    const filteredResults = results.filter((value) => {
      if (!String(value.folio).includes(searchedText)) {
        return false;
      } else if (type >= 0 && value.tipoMuestra !== type) {
        return false;
      } else if (revision >= 0 && value.Enviado !== revision) {
        return false;
      } else if (!String(value.fechaRecepcion).includes(byFecha)) {
        return false;
      } else if (!String(value.fechaMuestreo).includes(byFechaMuestreo)) {
        return false;
      }
      return true;
    });

    return filteredResults;
  };

  const filterData = filterResults(searchQuery, recepcion);
  const PER_PAGE = 12;
  const count = Math.ceil(filterData.length / PER_PAGE);
  const _DATA = usePagination(filterData, PER_PAGE);
  const handleChangePagination = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const handleChangeFechaMuestreo = (event) => {
    console.log(event.target.value);
    setByFechaMuestreo(event.target.value);
  };
  const handleChangeFecha = (event) => {
    console.log(event.target.value);
    setByFecha(event.target.value);
  };
  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleChangeRevision = (event) => {
    setRevision(event.target.value);
  };

  return (
    <>
      <Header
        title="RESULTADOS"
        subtitle={"Análisis del cliente: " + data.nombre}
      />
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
            <MenuItem value={0}>Revisión pendiente</MenuItem>
            <MenuItem value={1}>Revisión media</MenuItem>
            <MenuItem value={2}>Revisión total</MenuItem>
            <MenuItem value={-1}>Todos</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150 }}>
          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            type="date"
            label="Fecha de Recepción"
            onChange={handleChangeFecha}
            name="fechaRecepcion"
            sx={{ gridColumn: "span 1" }}
          />
        </FormControl>
        <FormControl sx={{ minWidth: 150 }}>
          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            type="date"
            label="Fecha de Muestreo"
            onChange={handleChangeFechaMuestreo}
            name="fechaMuestreo"
            sx={{ gridColumn: "span 1" }}
          />
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

export default Resultados;
