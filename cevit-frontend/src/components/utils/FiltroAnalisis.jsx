export const FiltroAnalisis = (query, resultados) => {
  if (!query) {
    return resultados;
  } else {
    return resultados.filter((d) => d.rMuestra.includes(query));
  }
};
