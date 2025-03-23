import React, { useContext } from "react";
import CarritoItem from "./carritoItem";
import { CarritoContext } from "../Context/carritoContext";
import { Grid2 } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/material";

const Carrito = () => {
  const { itemsCarrito, handleComprarCarrito } = useContext(CarritoContext);

  return (
    <>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <h2>
          Mi carrito{" "}
          {itemsCarrito.length === 0 && "(No tienes peliculas en tu carrito.)"}{" "}
        </h2>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleComprarCarrito();
          }}
        >
          COMPRAR AHORA
        </Button>
      </Box>
      <Grid2 container spacing={2}>
        {itemsCarrito.map((pelicula) => (
          <CarritoItem pelicula={pelicula}></CarritoItem>
        ))}
      </Grid2>
    </>
  );
};

export default Carrito;
