import React, { useContext } from "react";
import FavoritoItem from "./favoritoItem";
import { Grid2 } from "@mui/material";
import { FavoritoContext } from "../Context/favoritoContext";

const Favorito = () => {
  const { itemsFav } = useContext(FavoritoContext);

  return (
    <>
      <h2>
        Mis favoritos{" "}
        {itemsFav.length === 0 &&
          "(No tienes peliculas favoritas en tu lista.)"}{" "}
      </h2>
      <Grid2 container spacing={2}>
        {itemsFav.map((pelicula) => (
          <FavoritoItem pelicula={pelicula}></FavoritoItem>
        ))}
      </Grid2>
    </>
  );
};

export default Favorito;
