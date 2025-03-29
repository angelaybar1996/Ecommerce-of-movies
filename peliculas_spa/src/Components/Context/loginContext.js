import React, { createContext } from "react";
export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const handleLogin = (IdUsuario, token) => {
    localStorage.setItem("idUsuario", IdUsuario);
    localStorage.setItem("token", token);
  };
  return (
    <LoginContext.Provider value={{ handleLogin }}>
      {props.children}
    </LoginContext.Provider>
  );
};
