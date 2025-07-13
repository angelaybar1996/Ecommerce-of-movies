import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Peliculas from "../Pelicula/peliculas";
import Favoritos from "../Favorito/favorito";
import Carrito from "../Carrito/carrito";
import Buscar from "../Pelicula/buscar";
import Destacadas from "../Pelicula/destacadas";
import Registro from "../Registro/registro";
import Login from "../Login/login";
//agregar cambio
const Body = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: "100vh",
        py: 4, // padding vertical
        backgroundColor: "#f5f5f5",
      }}
    >
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/peliculas" element={<Peliculas />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/buscar/:valor" element={<Buscar />} />
          <Route path="/buscar" element={<Peliculas />} />
          <Route path="/destacadas" element={<Destacadas />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </Container>
    </Box>
  );
};

export default Body;
