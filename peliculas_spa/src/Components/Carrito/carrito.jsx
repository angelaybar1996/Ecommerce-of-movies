import React, { useContext } from "react";
import CarritoItem from "./carritoItem";
import { CarritoContext } from "../Context/carritoContext";
import { Grid2 } from "@mui/material";

const Carrito = () => {
  const { itemsCarrito } = useContext(CarritoContext);

  return (
    <>
      <h2>
        Mi carrito{" "}
        {itemsCarrito.length === 0 && "(No tienes peliculas en tu carrito.)"}{" "}
      </h2>
      <Grid2 container spacing={2}>
        {itemsCarrito.map((pelicula) => (
          <CarritoItem pelicula={pelicula}></CarritoItem>
        ))}
      </Grid2>
    </>
  );
};

export default Carrito;
