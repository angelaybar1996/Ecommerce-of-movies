import React, { useState, useContext } from "react";
import { Button } from "@mui/material";
import { Paper } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { Grid2 } from "@mui/material";
import { FavoritoContext } from "../Context/favoritoContext";
import { CarritoContext } from "../Context/carritoContext";

//Este componente debe recibir por parametro un objeto que devuelve sus propiedades
const Pelicula = ({ datos }) => {
  const { handleAgregarFavorito, handleEliminarFavorito } =
    useContext(FavoritoContext);
  const { handleComprarCarrito, handleAgregarAlCarrito } =
    useContext(CarritoContext);
  const [botones, setBotones] = useState("");
  const [esFavorito, setEsFavorito] = useState(datos.favorito.length > 0);

  const setFavorito = (pelicula) => {
    if (!esFavorito) {
      handleAgregarFavorito(pelicula);
      setEsFavorito(true);
    } else {
      handleEliminarFavorito(pelicula);
      setEsFavorito(false);
    }
  };

  return (
    <>
      <Grid2 container spacing={2} xs={12} sm={6} lg={3}>
        <Grid2>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <h2>{datos.titulo}</h2>
            <Favorite
              color={esFavorito ? "secondary" : "disabled"}
              style={{ cursor: "pointer" }}
              onClick={() => setFavorito(datos)}
            ></Favorite>
            <div>
              <img
                src={datos.portada}
                alt="Portada"
                style={{ width: "100%", height: "auto", maxWidth: 200 }}
              />
            </div>
            <div>
              <Rating value={datos.estrellas} readOnly />
            </div>
            <div>{datos.sinopsis}</div>
            <br />
            <div>{`Género: ${datos.genero}`}</div>
            <br />
            <div>{`Director:${datos.director}`}</div>
            <br />
            <div>{`Año: ${datos.anio}`}</div>
            <br />
            <div>
              <b>{`Precio:$ ${datos.precio}`}</b>
            </div>
            <br />
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleComprarCarrito();
                }}
              >
                Comprar
              </Button>
              &nbsp;
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  handleAgregarAlCarrito(datos);
                }}
              >
                Agregar al carrito
              </Button>
            </div>
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default Pelicula;
