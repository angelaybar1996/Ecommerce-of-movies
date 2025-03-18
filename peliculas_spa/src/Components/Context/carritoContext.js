import React, { useEffect, createContext, useState } from "react";
import {
  obtenerFavorito as obtenerCarrito, // Renombramos la importación
  agregarFavorito as agregarAlCarrito,
  eliminarFavorito as eliminarDelCarrito,
} from "../Services/favoritoServices";
import { comprarCarrito } from "../Services/carritoServices"; // Este es exclusivo para la compra

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [itemsCarrito, setItemsCarrito] = useState([]);
  const [cantidadCarrito, setCantidadCarrito] = useState(0);

  const handleObtenerCarrito = async () => {
    const { data: carrito } = await obtenerCarrito(); // Simula obtener el carrito
    setItemsCarrito(carrito);
    setCantidadCarrito(carrito.length);
  };

  const handleAgregarAlCarrito = async (pelicula) => {
    await agregarAlCarrito({
      idUsuario: 1,
      idPelicula: pelicula.idPelicula,
    });
    setCantidadCarrito(cantidadCarrito + 1);
    setItemsCarrito([...itemsCarrito, pelicula]);
  };

  const handleEliminarDelCarrito = async (pelicula) => {
    await eliminarDelCarrito({
      idUsuario: 1,
      idPelicula: pelicula.idPelicula,
    });
    const newItems = itemsCarrito.filter(
      (item) => item.idPelicula !== pelicula.idPelicula
    );
    setItemsCarrito(newItems);
    setCantidadCarrito(cantidadCarrito - 1);
  };

  const handleComprarCarrito = async () => {
    await comprarCarrito({
      idUsuario: 1,
      peliculas: itemsCarrito, // Enviamos los productos a la compra
    });
    setItemsCarrito([]);
    setCantidadCarrito(0);
  };

  useEffect(() => {
    handleObtenerCarrito();
  }, []);

  return (
    <CarritoContext.Provider
      value={{
        itemsCarrito,
        cantidadCarrito,
        handleAgregarAlCarrito,
        handleEliminarDelCarrito,
        handleComprarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
