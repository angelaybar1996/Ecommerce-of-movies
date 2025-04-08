import React, { useEffect, createContext, useState } from "react";
import {
  obtenerFavorito,
  agregarFavorito,
  eliminarFavorito,
} from "../Services/favoritoServices";

//sera utilizado para compartir datos entre componentes
export const FavoritoContext = createContext();

//envolvera los componentes que necesiten acceder a los favoritos
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
      idUsuario: localStorage.getItem("idUsuario"),
      idPelicula: pelicula.idPelicula,
    });
    setCantidadFav(cantidadFav + 1);
    setItemsFav([...itemsFav, pelicula]);
  };

  const handleEliminarFavorito = async (pelicula) => {
    const { data } = await eliminarFavorito({
      idUsuario: localStorage.getItem("idUsuario"),
      idPelicula: pelicula.idPelicula,
    });
    const newItems = itemsFav.filter(
      (item) => item.idPelicula !== pelicula.idPelicula
    );
    setItemsFav(newItems);
    setCantidadFav(cantidadFav - 1);
  };

  //se utiliza para cargar los favoritos al inicio
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
