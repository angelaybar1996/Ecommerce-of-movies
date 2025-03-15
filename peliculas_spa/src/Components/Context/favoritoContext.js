import React, { useEffect, createContext, useState } from "react";
import {
  obtenerFavorito,
  agregarFavorito,
  eliminarFavorito,
} from "../Services/favoritoServices";

export const FavoritoContext = createContext();
//la palabra provider es reservada en react que sabe que es solo en Context
export const FavoritoProvider = (props) => {
  const [cantidadFav, setCantidadFav] = useState(0);
  const [itemsFav, setItemsFav] = useState([]);

  const handleObtenerFavorito = async () => {
    const { data: favoritos } = await obtenerFavorito();
    setItemsFav(favoritos);
    setCantidadFav(favoritos.length);
  };

  //esta definicion es como el json que se envia por postman
  const handleAgregarFavorito = async (pelicula) => {
    await agregarFavorito({
      idUsuario: 1,
      idPelicula: pelicula.idPelicula,
    });
    setCantidadFav(cantidadFav + 1);
    setItemsFav([...itemsFav, pelicula]);
  };

  const handleEliminarFavorito = async (pelicula) => {
    const { data } = await eliminarFavorito({
      idUsuario: 1,
      idPelicula: pelicula.idPelicula,
    });
    const newItems = itemsFav.filter(
      (item) => item.idPelicula !== pelicula.idPelicula
    );
    setItemsFav(newItems);
    setCantidadFav(cantidadFav - 1);
  };

  //se ejecuta una vez cuando se monta el componente
  useEffect(() => {
    handleObtenerFavorito();
  }, []);

  return (
    <FavoritoContext.Provider
      value={{
        itemsFav,
        cantidadFav,
        handleAgregarFavorito,
        handleEliminarFavorito,
      }}
    >
      {props.children}
    </FavoritoContext.Provider>
  );
};
