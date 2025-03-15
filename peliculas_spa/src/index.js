import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Header from "./Components/Header/header";
import Menu from "./Components/Menu/menu";
import Body from "./Components/Body/body";
import Footer from "./Components/Footer/footer";
import "./index.css";
import { FavoritoProvider } from "./Components/Context/favoritoContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoritoProvider>
        <Header></Header>
        <Menu></Menu>
        <Body></Body>
        <Footer></Footer>
      </FavoritoProvider>
    </BrowserRouter>
  </React.StrictMode>
);
