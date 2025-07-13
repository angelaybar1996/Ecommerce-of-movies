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
      <Grid2 container spacing={2} justifyContent="center">
        {peliculas.map((pelicula) => (
          <Grid2
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            key={pelicula.idPelicula}
            sx={{ display: "flex" }}
          >
            <Pelicula datos={pelicula} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};

export default Destacadas;
