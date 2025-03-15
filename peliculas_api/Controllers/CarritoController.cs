using Microsoft.AspNetCore.Mvc;
using peliculas_api.Context;
using peliculas_api.Models;
using System;
using System.Collections.Generic;

namespace peliculas_api.Controllers
{
    [Route("api/[controller]")]
    public class CarritoController : Controller
    {
       
        private readonly PeliculasDbContext _context;

        public CarritoController(PeliculasDbContext context)
        {
            _context = context;
        }

        [Route("[action]")]
        [HttpPost]
        public ActionResult Comprar([FromBody] List<Carrito> carrito)
        {
            try
            {
                foreach (var item in carrito)
                {
                    _context.Carrito.Add(item);
                    _context.SaveChanges();
                }
                return Ok(carrito);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
