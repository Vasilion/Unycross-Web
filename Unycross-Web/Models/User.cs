using System.ComponentModel.DataAnnotations;

namespace Unycross_Web.Models
{
    public class User
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
        public string? AmaNumber { get; set; }
        public string? Email { get; set; }
        public ICollection<FavoriteTrack>? FavoriteTracks { get; set; }
    }
}
