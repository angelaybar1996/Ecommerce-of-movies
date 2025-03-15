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
    const { data: destacadas } = await getDestacadas(5);
    console.log(destacadas);
    setPeliculas(destacadas);
  };

  return (
    <>
      <h2>Peliculas destacadas</h2>
      <Grid2 container spacing={2}>
        {peliculas.map((pelicula) => (
          <Pelicula datos={pelicula} key={pelicula.diPelicula}></Pelicula>
        ))}
      </Grid2>
    </>
  );
};

export default Destacadas;
