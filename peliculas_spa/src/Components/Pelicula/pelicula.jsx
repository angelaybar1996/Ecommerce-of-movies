import React, { useState, useContext, useEffect } from "react";
import { Button } from "@mui/material";
import { Paper } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { Grid2 } from "@mui/material";
import { FavoritoContext } from "../Context/favoritoContext";
import { CarritoContext } from "../Context/carritoContext";

//Este componente debe recibir por parametro un objeto que devuelve sus propiedades
const Pelicula = ({ datos }) => {
  const { handleAgregarCarrito, handleComprar } = useContext(CarritoContext);
  const { handleAgregarFavorito, handleEliminarFavorito } =
    useContext(FavoritoContext);
  //console.log(datos.favorito.length);
  const [esFavorita, setEsFavorita] = useState(false);

  const [botones, setBotones] = useState(false);

  useEffect(() => {
    const estaEnFavoritos = Favoritos.some((f) => f.id);
  });

  useEffect(() => {
    setBotones(datos.carrito && datos.carrito.length > 0);
  }, [datos.carrito]);

  const setFavorito = (pelicula) => {
    if (!esFavorita) {
      handleAgregarFavorito(pelicula);
    } else {
      handleEliminarFavorito(pelicula);
    }
    setEsFavorita(!esFavorita);
  };

  return (
    <>
      <Grid2 container item xs={12} sm={4} lg={3}>
        <Paper style={{ padding: 5, textAlign: "center" }}>
          <h2>{datos.titulo}</h2>
          <Favorite
            color={esFavorita ? "secondary" : "disabled"}
            style={{ cursor: "pointer" }}
            onClick={() => setFavorito(datos)}
          ></Favorite>
          <div>
            <img width={200} src={datos.portada} />
          </div>
          <div>
            <Rating value={datos.estrellas} readOnly />
          </div>
          <div>{datos.sinopsis}</div>
          <br />
          <div>{`Género: ${datos.genero}`}</div>
          <br />
          <div>{`Director: ${datos.director}`}</div>
          <br />
          <div>{`Año: ${datos.anio}`}</div>
          <br />
          <div>
            <b>{`Precio: $ ${datos.precio}`}</b>
          </div>
          <br />

          <div>
            <Button
              variant="contained"
              color="primary"
              disabled={botones}
              onClick={() => {
                handleComprar([datos]);
                setBotones(true);
                alert("¡Has comprado esta película!");
              }}
            >
              Comprar
            </Button>
            &nbsp;
            <Button
              variant="outlined"
              color="secondary"
              disabled={botones}
              onClick={() => {
                handleAgregarCarrito(datos);
                setBotones(true);
              }}
            >
              Agregar al Carrito
            </Button>
          </div>
        </Paper>
      </Grid2>
    </>
  );
};

export default Pelicula;
