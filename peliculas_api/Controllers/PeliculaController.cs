using Microsoft.AspNetCore.Mvc;
using peliculas_api.Context;
using System;
using System.Linq;

namespace peliculas_api.Controllers
{
    
    [Route ("api/[Controller]")]//este es la url principal para este controller
    public class PeliculaController : Controller
    {
        private readonly PeliculasDbContext context;
        
        public PeliculaController(PeliculasDbContext context)//Contructor
        {
            this.context = context;
        }

        [HttpGet]//esto es un data notation
        public ActionResult Get()//Endpoint todas las peliculas
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
                    Favorito = P.Favorito.Select(fa => new {fa.IdPelicula,fa.IdUsuario})
                }).ToList());
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("[action]/{valor}")]//Endpoint buscar por
        [HttpGet("BuscarPor")]
        public ActionResult BuscarPor(string valor)
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
                    Favorito = p.Favorito.Select(fa => new { fa.IdPelicula, fa.IdUsuario })
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

        [Route("[action]/{estrellas}")]
        [HttpGet("GetDestacadas")]
        public ActionResult GetDestacadas(int estrellas)
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
                    Favorito = p.Favorito.Select(fa => new { fa.IdPelicula, fa.IdUsuario })
                }).Where(p => p.Estrellas >=estrellas));

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

    }
}

