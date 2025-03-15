using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace peliculas_api.Models
{
    public class Usuario
    {
        [Key]
        public int IdUsuario { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public List<Favorito> Favorito { get; set; }
        public List<Carrito> Carrito { get; set; }

    }
}
