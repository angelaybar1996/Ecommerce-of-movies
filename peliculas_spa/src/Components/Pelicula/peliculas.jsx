import React, { useState, useEffect } from "react";
import Pelicula from "./pelicula";
import { obtenerPeliculas } from "../Services/peliculasServices";
import { Grid2 } from "@mui/material";

//Creacion de un componente, este componente tiene un array y este array se envia por el componente peliculas mediante
//la funcion map dentro del html
const Peliculas = () => {
  const [peliculas, setPeliculas] = useState([]);

  //manera con AXIOS
  const cargarPeliculas = async () => {
    const { data: films } = await obtenerPeliculas();
    console.log(films);
    setPeliculas(films);
  };

  //manera con FETCH
  /*const cargarPeliculas = () => {
    fetch("http://localhost:5000/api/Pelicula")
      .then((response) => response.json())
      .then((data) => setPeliculas(data));
  };*/

  useEffect(() => {
    cargarPeliculas();
  }, []);

  return (
    <>
      <div>
        <h2>Peliculas</h2>
      </div>
      <Grid2 container spacing={2} sx={{ flexGrow: 1 }}>
        {peliculas.map((pelicula) => (
          <Grid2 item xs={12} sm={6} md={4} lg={3} key={pelicula.idPelicula}>
            <Pelicula datos={pelicula} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};

export default Peliculas;
