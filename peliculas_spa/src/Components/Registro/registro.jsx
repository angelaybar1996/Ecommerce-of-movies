import React, { useState } from "react";
import { Container, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { AccountCircle, MailOutline, VpnKey } from "@mui/icons-material";
import { registrar } from "../Services/usuarioServices";
import { useNavigate } from "react-router-dom";

const Registro = () => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registrar(usuario);
  };

  const history = useNavigate();

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h2 style={{ color: "grey" }}>Venta de peliculas</h2>
        <h2>Registrate ahora</h2>
        <AccountCircle color="action"></AccountCircle>
        <TextField
          name="nombre"
          onChange={(e) => handleChange(e)}
          required
          placeholder="Ingresa tu nombre"
          style={{ width: 300 }}
        />
        &nbsp;
        <TextField
          name="apellido"
          onChange={(e) => handleChange(e)}
          required
          placeholder="Ingresa tu apellido"
          style={{ width: 300 }}
        />
        <br />
        <br />
        <MailOutline color="action" />
        &nbsp;
        <TextField
          name="email"
          onChange={(e) => handleChange(e)}
          type="email"
          required
          placeholder="Ingresa tu email"
          style={{ width: 300 }}
        />
        <br />
        <br />
        <VpnKey color="action" />
        &nbsp;
        <TextField
          name="password"
          onChange={(e) => handleChange(e)}
          type="password"
          required
          placeholder="Ingresa tu password"
          style={{ width: 300 }}
        />
        <br />
        <br />
        <hr />
        <Button
          variant="contained"
          color="default"
          onClick={() => history("/")}
        >
          Volver
        </Button>
        &nbsp;
        <Button type="submit" variant="contained" color="secondary">
          Registrate
        </Button>
      </form>
    </Container>
  );
};

export default Registro;
