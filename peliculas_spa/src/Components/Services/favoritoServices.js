import axios from "./axiosServices";

export function obtenerFavorito() {
  return axios.get("Favorito/");
}

export function agregarFavorito(favorito) {
  return axios.post("Favorito/Agregar/", favorito);
}

export function eliminarFavorito(favorito) {
  return axios.post("Favorito/Eliminar/", favorito);
}
