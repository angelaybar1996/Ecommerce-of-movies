import React, { useState } from "react";
//import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Search, Star, Apps, Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";

const Menu = () => {
  const history = useNavigate();
  const [buscar, setBuscar] = useState("");
  const handleBuscar = (e) => {
    setBuscar(e.target.value);
  };

  return (
    <nav>
      <TextField
        name="buscar"
        value={buscar}
        onChange={(e) => handleBuscar(e)}
        placeholder="Buscar por genero, titulo, actores...."
        style={{ width: 300, height: 40 }}
      />
      <Close
        color="action"
        onClick={() => setBuscar("")}
        style={{ cursor: "pointer" }}
      ></Close>
      <Button variant="contained" onClick={() => history("/buscar/" + buscar)}>
        <Search color="action"></Search>
        Buscar
      </Button>
      &nbsp;
      <Button variant="contained" onClick={() => history("/destacadas")}>
        <Star color="action"></Star>
        Destacadas
      </Button>
      &nbsp;
      <Button variant="contained" onClick={() => history("/peliculas")}>
        <Apps color="action"></Apps>
        Todas
      </Button>
      &nbsp;
      <Button
        variant="contained"
        onClick={() => {
          localStorage.clear();
          history("/");
        }}
      >
        <Logout color="action"></Logout>
        Salir
      </Button>
    </nav>
  );
};

export default Menu;
