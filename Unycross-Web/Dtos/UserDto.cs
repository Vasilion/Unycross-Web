using System.ComponentModel.DataAnnotations;
using Unycross_Web.Models;

namespace Unycross_Web.Dtos
{
    public class UserDto
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
