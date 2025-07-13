import React, { useState, useEffect } from "react";
import { buscarPor } from "../Services/peliculasServices";
import { Grid2 } from "@mui/material";
import Pelicula from "./pelicula";
import { useParams } from "react-router-dom";

const Buscar = () => {
  const [peliculas, setPelicula] = useState([]);
  const { valor } = useParams();

  const handleBuscar = async (buscar) => {
    const idUsuario = localStorage.getItem("idUsuario");
    const { data: peliculas } = await buscarPor(idUsuario, buscar);
    console.log(peliculas);
    setPelicula(peliculas);
  };

  useEffect(() => {
    if (valor) {
      handleBuscar(valor);
    }
  }, [valor]);

  return (
    <>
      <h2>Resultados de la busqueda</h2>
      <Grid2 container spacing={2} justifyContent="center">
        {peliculas.map((pelicula) => {
          return <Pelicula datos={pelicula} key={pelicula.idPelicula} />;
        })}
      </Grid2>
    </>
  );
};

export default Buscar;
