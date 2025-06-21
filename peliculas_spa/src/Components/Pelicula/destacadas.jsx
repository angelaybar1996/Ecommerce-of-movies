import React, { useState, useEffect } from "react";
import { getDestacadas } from "../Services/peliculasServices";
import Pelicula from "./pelicula";
import { Grid2 } from "@mui/material";

const Destacadas = () => {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    cargarPeliculas();
  }, []);

  const cargarPeliculas = async () => {
    const idUsuario = localStorage.getItem("idUsuario");
    const estrellas = 5; // o el valor que quieras filtrar

    if (!idUsuario || estrellas === undefined) {
      console.warn("Faltan datos para cargar destacadas");
      return;
    }

    const { data: destacadas } = await getDestacadas(idUsuario, estrellas);
    console.log(destacadas);
    setPeliculas(destacadas);
  };

  return (
    <>
      <h2>Peliculas destacadas</h2>
      <Grid2 container spacing={2}>
        {peliculas.map((pelicula) => (
          <Pelicula datos={pelicula} key={pelicula.idPelicula}></Pelicula>
        ))}
      </Grid2>
    </>
  );
};

export default Destacadas;
