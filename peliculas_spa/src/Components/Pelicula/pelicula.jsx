import React, { useState, useContext, useEffect } from "react";
import { Button } from "@mui/material";
import { Paper } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { Grid2 } from "@mui/material";
import { FavoritoContext } from "../Context/favoritoContext";
import { CarritoContext } from "../Context/carritoContext";
import { comprarCarrito } from "../Services/carritoServices";

//Este componente debe recibir por parametro un objeto que devuelve sus propiedades
const Pelicula = ({ datos }) => {
  const { handleAgregarAlCarrito } = useContext(CarritoContext);

  const { handleAgregarFavorito, handleEliminarFavorito, itemsFav } =
    useContext(FavoritoContext);

  //console.log(datos.favorito.length);
  const [esFavorita, setEsFavorita] = useState(false);

  const [botones, setBotones] = useState(false);

  // Verifica si la película ya fue comprada o no
  const [comprada, setComprada] = useState(false);

  useEffect(() => {
    // Verificamos si la película ya ha sido comprada
    const yaComprada = datos.carrito && datos.carrito.length > 0;
    setComprada(yaComprada);
    setBotones(yaComprada); // Desactivamos los botones si la película ya está en el carrito (comprada)
  }, [datos.carrito]);

  const comprarDirecto = async () => {
    const idUsuario = localStorage.getItem("idUsuario");
    try {
      const payload = [
        {
          idUsuario,
          idPelicula: datos.idPelicula,
        },
      ];
      await comprarCarrito(payload); // reemplazá por tu ruta real
      alert("¡Has comprado esta película!");
      setBotones(true); // Desactiva todos los botones después de la compra
      setComprada(true); // Marca la película como comprada
    } catch (error) {
      console.error("Error al comprar:", error);
      alert("Error al procesar la compra.");
    }
  };

  //editado 21/06
  useEffect(() => {
    const estaEnFavoritos = itemsFav.some(
      (f) => f.idPelicula === datos.idPelicula
    );
    setEsFavorita(estaEnFavoritos);
  }, [itemsFav, datos.idPelicula]);

  /*
  useEffect(() => {
    const estaEnFavoritos = Favoritos.some((f) => f.id);
  });
  */

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
            disabled={botones}
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
              onClick={comprarDirecto}
            >
              Comprar
            </Button>
            &nbsp;
            <Button
              variant="outlined"
              color="secondary"
              disabled={botones}
              onClick={() => {
                handleAgregarAlCarrito(datos);
                setBotones(true);
              }}
            >
              Agregar al Carrito
            </Button>
          </div>
          {comprada && (
            <div style={{ marginTop: "10px", color: "green" }}>
              <span>¡Ya compraste esta película!</span>
            </div>
          )}
        </Paper>
      </Grid2>
    </>
  );
};

export default Pelicula;
