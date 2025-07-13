import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Rating,
  IconButton,
  Button,
  Paper,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FavoritoContext } from "../Context/favoritoContext";
import { CarritoContext } from "../Context/carritoContext";
import { comprarCarrito } from "../Services/carritoServices";

const Pelicula = ({ datos }) => {
  const { handleAgregarAlCarrito } = useContext(CarritoContext);
  const { handleAgregarFavorito, handleEliminarFavorito, itemsFav } =
    useContext(FavoritoContext);

  const [esFavorita, setEsFavorita] = useState(false);
  const [botones, setBotones] = useState(false);
  const [comprada, setComprada] = useState(false);

  useEffect(() => {
    const yaComprada = datos.carrito && datos.carrito.length > 0;
    setComprada(yaComprada);
    setBotones(yaComprada);
  }, [datos.carrito]);

  useEffect(() => {
    const estaEnFavoritos = itemsFav.some(
      (f) => f.idPelicula === datos.idPelicula
    );
    setEsFavorita(estaEnFavoritos);
  }, [itemsFav, datos.idPelicula]);

  const setFavorito = (pelicula) => {
    if (!esFavorita) handleAgregarFavorito(pelicula);
    else handleEliminarFavorito(pelicula);
    setEsFavorita(!esFavorita);
  };

  const comprarDirecto = async () => {
    const idUsuario = localStorage.getItem("idUsuario");
    try {
      const payload = [{ idUsuario, idPelicula: datos.idPelicula }];
      await comprarCarrito(payload);
      alert("¡Has comprado esta película!");
      setBotones(true);
      setComprada(true);
    } catch (error) {
      console.error("Error al comprar:", error);
      alert("Error al procesar la compra.");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        height: "95%",
        display: "flex",
        flexDirection: "column",
        padding: 2,
      }}
    >
      <Typography variant="h8" gutterBottom sx={{ width: 180 }}>
        {datos.titulo}
      </Typography>

      <Box display="flex" justifyContent="center" mb={1}>
        <IconButton onClick={() => setFavorito(datos)} disabled={botones}>
          <FavoriteIcon color={esFavorita ? "error" : "disabled"} />
        </IconButton>
      </Box>

      <Box
        component="img"
        src={datos.portada}
        alt={datos.titulo}
        sx={{
          width: "100%",
          height: 250,
          objectFit: "contain",
          backgroundColor: "#e0e0e0",
          mb: 2,
        }}
      />

      <Rating value={datos.estrellas} readOnly sx={{ mb: 1 }} />

      {}
      <Box sx={{ flexGrow: 1, maxWidth: 180 }}>
        <Typography variant="subtitle1">{datos.sinopsis}</Typography>
        <Typography variant="subtitle1">{`Género: ${datos.genero}`}</Typography>
        <Typography variant="subtitle1">{`Director: ${datos.director}`}</Typography>
        <Typography variant="subtitle1">{`Año: ${datos.anio}`}</Typography>
      </Box>

      <Typography variant="subtitle1" fontWeight="bold" /*mt={2}*/>
        {`Precio: $${datos.precio}`}
      </Typography>

      <Box mt={2}>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          disabled={botones}
          onClick={comprarDirecto}
          sx={{ mb: 1 }}
        >
          Comprar
        </Button>
        <Button
          variant="outlined"
          fullWidth
          color="secondary"
          disabled={botones}
          onClick={() => {
            handleAgregarAlCarrito(datos);
            setBotones(true);
          }}
        >
          Agregar al Carrito
        </Button>
      </Box>

      {comprada && (
        <Typography mt={2} color="green" fontWeight="bold">
          ¡Ya compraste esta película!
        </Typography>
      )}
    </Paper>
  );
};

export default Pelicula;
