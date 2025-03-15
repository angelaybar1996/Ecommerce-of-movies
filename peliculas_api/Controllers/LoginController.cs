using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using peliculas_api.Context;
using peliculas_api.Models;
using System;
using System.Linq;

namespace peliculas_api.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private readonly PeliculasDbContext _context;

        public LoginController(PeliculasDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Login([FromBody] Usuario usuario)
        {
            string token = "";
            Usuario usuarioValido= _context.Usuario.Where(
                u=> u.Email == usuario.Email &&
                u.Password == usuario.Password ).FirstOrDefault();

            if (usuarioValido != null) {
                token = "Token";
            }
            return Ok(token);
        }
    }
}
