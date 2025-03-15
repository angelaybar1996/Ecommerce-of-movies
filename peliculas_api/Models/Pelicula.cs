using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace peliculas_api.Models
{
    public class Pelicula
    {
        [Key]
        public int IdPelicula { get; set; }
        public string Titulo { get; set; }
        public int Anio { get; set; }
        public int Duracion { get; set; }
        public string Genero { get; set; }
        public string Director { get; set; }
        public string Actores { get; set; }
        public string Sinopsis { get; set; }
        public string Portada { get; set; }
        public byte Estrellas { get; set; }
        public decimal Precio { get; set; }
        public List<Favorito> Favorito { get; set; }
        public List<Carrito> Carrito { get; set; }

    }
}
