import React from "react";
import "./footer.css";
import { Email, Facebook, WhatsApp } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer>
      <p>Venta de peliculas - copyright</p>
      <Email color="primary" fontSize="large"></Email>
      &nbsp;&nbsp;
      <Facebook color="primary" fontSize="large"></Facebook>
      &nbsp;&nbsp;
      <WhatsApp color="primary" fontSize="large"></WhatsApp>
    </footer>
  );
};

export default Footer;
