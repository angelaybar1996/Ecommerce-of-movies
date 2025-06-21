import servicio from "./axiosServices";

export function obtenerPeliculas(idUsuario) {
  return servicio.get("Pelicula/" + idUsuario);
}

export function buscarPor(idUsuario, buscar) {
  return servicio.get("Pelicula/BuscarPor/" + idUsuario + "/" + buscar);
}

export function getDestacadas(idUsuario, estrellas) {
  return servicio.get("Pelicula/GetDestacadas/" + idUsuario + "/" + estrellas);
}
