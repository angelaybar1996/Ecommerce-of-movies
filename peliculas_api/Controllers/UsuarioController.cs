using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using peliculas_api.Context;
using peliculas_api.Models;
using System;

namespace peliculas_api.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class UsuarioController : Controller
    {
        private readonly PeliculasDbContext _context;

        public UsuarioController(PeliculasDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public ActionResult Post([FromBody] Usuario usuario)
        {
            try
            {
                _context.Usuario.Add(usuario);
                _context.SaveChanges();
                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
