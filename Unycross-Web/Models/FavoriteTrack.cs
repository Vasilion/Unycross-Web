using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Unycross_Web.Models
{
    public class FavoriteTrack
    {
        // Composite key for the relationship between User and Track
        [Key, Column(Order = 0)]
        public int UserId { get; set; }

        [Key, Column(Order = 1)]
        public int TrackId { get; set; }

        // Navigation properties
        public User User { get; set; }
        public Track Track { get; set; }
    }
}
