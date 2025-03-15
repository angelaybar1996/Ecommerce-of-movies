using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using peliculas_api.Context;
using peliculas_api.Models;
using System;
using System.Linq;

namespace peliculas_api.Controllers
{
    [Route("api/[controller]")]
    public class FavoritoController : Controller
    {
       private readonly PeliculasDbContext _context;

        public FavoritoController(PeliculasDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult Get() 
        {
            try
            {
                return Ok(_context.Favorito.Select(p => p.Pelicula));
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Route("[action]")]
        [HttpPost]
        public ActionResult Agregar([FromBody] Favorito favorito)
        {
            try
            {
                _context.Favorito.Add(favorito);
                _context.SaveChanges();
                return Ok(favorito);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [Route("[action]")]
        [HttpPost]
        public ActionResult Eliminar([FromBody] Favorito favorito)
        {
            try
            {
                _context.Favorito.Remove(favorito);
                _context.SaveChanges();
                return Ok(favorito);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
