import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { Favorite, ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { FavoritoContext } from "../Context/favoritoContext";

const Header = () => {
  const { cantidadFav } = useContext(FavoritoContext);

  return (
    <header>
      <h1>Peliculas</h1>
      <br />
      <Link to="/favoritos">
        <Favorite color="action" fontSize="large"></Favorite>
      </Link>
      <Badge badgeContent={cantidadFav} color="secondary"></Badge>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/carrito">
        <ShoppingCart color="action" fontSize="large"></ShoppingCart>
      </Link>
      <Badge badgeContent={1} color="primary"></Badge>
    </header>
  );
};

export default Header;
