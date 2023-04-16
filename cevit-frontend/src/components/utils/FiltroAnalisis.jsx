export const FiltroAnalisis = (query, resultados, campo) => {
  if (!query) {
    return resultados;
  } else if (campo === "rMuestra") {
    return resultados.filter((d) => d.rMuestra.includes(query));
  } else if (campo === "rEnviado") {
    return resultados.filter((d) => String(d.rEnviado).includes(query));
  } else if (campo === "rTipoMuestra") {
    return resultados.filter((d) => String(d.rTipoMuestra).includes(query));
  }
};
