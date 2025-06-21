using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using peliculas_api.Context;
using peliculas_api.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace peliculas_api.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private readonly PeliculasDbContext _context;
        private readonly string keyValue;
        private readonly string issuer;
        private readonly int expirationTime;

        public LoginController(PeliculasDbContext context,IConfiguration config)
        {
            keyValue = config.GetSection("JWT_KEY").GetSection("Key").Value.ToString();
            issuer=config.GetSection("JWT_KEY").GetSection("Issuer").Value.ToString();  
            expirationTime=Int32.Parse(config.GetSection("JWT_KEY").GetSection("ExpirationTime").Value);
            _context = context;
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Login([FromBody] LoginDto loginDto)
        {
            var usuarioValido = _context.Usuario
                .FirstOrDefault(u => u.Email == loginDto.Email && u.Password == loginDto.Password);

            if (usuarioValido != null)
            {
                usuarioValido.Token = GetJWT(usuarioValido.Email);
                return Ok(usuarioValido);
            }

            return BadRequest("Credenciales incorrectas");
        }

        private string GetJWT(string email)
        {
            var jwtKey=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyValue));
            var secureId = new SigningCredentials(jwtKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub,email),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
            };

            var tokenBody=new JwtSecurityToken(
                issuer:issuer,
                audience:issuer,
                claims,
                expires:DateTime.Now.AddMinutes(expirationTime),
                signingCredentials:secureId);
            var token = new JwtSecurityTokenHandler().WriteToken(tokenBody);

            return token;
        }
    }
}
