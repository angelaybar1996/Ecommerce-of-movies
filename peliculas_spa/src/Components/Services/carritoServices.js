import axios from "./axiosServices";

export function comprarCarrito(carrito) {
  return axios.post("Carrito/comprar/", carrito);
}
