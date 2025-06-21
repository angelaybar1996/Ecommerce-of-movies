using Microsoft.AspNetCore.Mvc;
using peliculas_api.Context;
using peliculas_api.Models;
using System;
using System.Linq;

namespace peliculas_api.Controllers
{

    [ApiController]
    [Route ("api/[Controller]")]//este es la url principal para este controller
    public class PeliculaController : ControllerBase
    {
        private readonly PeliculasDbContext context;
        
        public PeliculaController(PeliculasDbContext context)//Contructor
        {
            this.context = context;
        }

        [Route("{idUsuario}")]
        [HttpGet]//esto es un data notation
        public ActionResult Get(int idUsuario)//Endpoint todas las peliculas
        {
            try
            {
                return Ok(context.Pelicula.Select(P => new
                {
                    P.IdPelicula,
                    P.Titulo,
                    P.Anio,
                    P.Duracion,
                    P.Genero,
                    P.Director,
                    P.Actores,
                    P.Sinopsis,
                    P.Portada,
                    P.Estrellas,
                    P.Precio,
                    favorito = P.Favorito.Where(f => f.IdUsuario==idUsuario).Select(
                        fa=>new {fa.IdPelicula}),
                    carrito=P.Carrito.Where(c=>c.IdUsuario==idUsuario).Select(
                        ca=>new {ca.IdPelicula})
                }).ToList());
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("[action]/{idUsuario}/{valor}")]//Endpoint buscar por
        [HttpGet("BuscarPor")]
        public ActionResult BuscarPor(int idUsuario, string valor)
        {
            try
            {
                return Ok(context.Pelicula.Select(p =>
                new
                {
                    p.IdPelicula,
                    p.Titulo,
                    p.Anio,
                    p.Duracion,
                    p.Genero,
                    p.Director,
                    p.Actores,
                    p.Sinopsis,
                    p.Portada,
                    p.Estrellas,
                    p.Precio,
                    favorito = p.Favorito.Where(f => f.IdUsuario==idUsuario).Select(
                        fa=> new {fa.IdPelicula,fa.IdUsuario}),
                    carrito=p.Carrito.Where(c=>c.IdUsuario==idUsuario).Select(
                        ca=> new {ca.IdPelicula})
                }).Where(p => p.Genero.Contains(valor) ||
                p.Titulo.Contains(valor) ||
                p.Director.Contains(valor) ||
                p.Actores.Contains(valor)));
                  
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [Route("[action]/{idUsuario}/{estrellas}")]
        [HttpGet("GetDestacadas")]
        public ActionResult GetDestacadas(int idUsuario,int estrellas)
        {
            try
            {
                return Ok(context.Pelicula.Select(p =>
                new
                {
                    p.IdPelicula,
                    p.Titulo,
                    p.Anio,
                    p.Duracion,
                    p.Genero,
                    p.Director,
                    p.Actores,
                    p.Sinopsis,
                    p.Portada,
                    p.Estrellas,
                    p.Precio,
                    favorito = p.Favorito.Where(f => f.IdUsuario == idUsuario).Select(
                        fa => new { fa.IdPelicula, fa.IdUsuario }),
                    carrito = p.Carrito.Where(c => c.IdUsuario == idUsuario).Select(
                        ca => new { ca.IdPelicula })
                }).Where(p => p.Estrellas >=estrellas));

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

    }
}

