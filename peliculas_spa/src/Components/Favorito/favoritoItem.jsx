import React, { useContext } from "react";
import { FavoritoContext } from "../Context/favoritoContext";
import { Grid2 } from "@mui/material";
import { Button } from "@mui/material";
import { Rating } from "@mui/material";
import { Paper } from "@mui/material";

const FavoritoItem = ({ pelicula }) => {
  const { handleEliminarFavorito } = useContext(FavoritoContext);

  return (
    <>
      <Grid2 container item xs={12} sm={12} lg={12}>
        <Paper style={{ padding: 5, textAlign: "center", width: "100%" }}>
          <table style={{ width: "100%" }}>
            <tr>
              <td>
                <img width={60} src={pelicula.portada} />
              </td>
              <td>
                <h2>{pelicula.titulo}</h2>
                <Rating value={pelicula.estrellas} readOnly></Rating>
              </td>
              <td>{`Año: ${pelicula.anio}`}</td>
              <td>{`Precio: ${pelicula.precio}`}</td>
              <td>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleEliminarFavorito(pelicula)}
                >
                  Quitar
                </Button>
              </td>
            </tr>
          </table>
        </Paper>
      </Grid2>
    </>
  );
};

export default FavoritoItem;
