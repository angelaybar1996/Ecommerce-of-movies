import React, { useState, useContext } from "react";
import { Container, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { MailOutline, VpnKey } from "@mui/icons-material";
import { login } from "../Services/usuarioServices";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/loginContext";
import { FavoritoContext } from "../Context/favoritoContext";
import sha1 from "sha1";

const Login = () => {
  const history = useNavigate();

  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  const { handleLogin } = useContext(LoginContext);
  const { handleObtenerFavorito } = useContext(FavoritoContext);

  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: usuarioValido } = await login(usuario);
    if (usuarioValido) {
      handleLogin(usuarioValido.idUsuario, usuarioValido.token);
      handleObtenerFavorito();
      history("/destacadas");
    } else {
      setMsg("Las credenciales son incorrectas,intente nuevamente");
    }
  };

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]:
        e.target.name === "password" ? sha1(e.target.value) : e.target.value,
    });
    console.log(usuario);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h2 style={{ color: "grey" }}>Venta de peliculas</h2>
        <h2>Bienvenido</h2>
        <MailOutline color="action"></MailOutline>
        &nbsp;
        <TextField
          type="email"
          name="email"
          onChange={(e) => handleChange(e)}
          placeholder="Ingresa tu email"
          required
          style={{ width: 300 }}
        />
        <br />
        <br />
        <VpnKey color="action" />
        &nbsp;
        <TextField
          type="password"
          name="password"
          onChange={(e) => handleChange(e)}
          placeholder="Ingresa tu password"
          required
          style={{ width: 300 }}
        />
        <br />
        <br />
        <h4 style={{ color: "red" }}>{msg}</h4>
        <hr />
        <Button type="submit" variant="contained" color="primary">
          login
        </Button>
        &nbsp;
        <Button
          variant="contained"
          color="secondary"
          onClick={() => history("/registro")}
        >
          Registrate
        </Button>
      </form>
    </Container>
  );
};

export default Login;
