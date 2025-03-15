namespace peliculas_api.Models
{
    public class Carrito
    {
        public int IdUsuario { get; set; }
        public int IdPelicula { get; set; }
        public Usuario Usuario { get; set; }
        public Pelicula Pelicula { get; set; }
    }
}
