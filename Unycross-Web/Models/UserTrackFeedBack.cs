using System.ComponentModel.DataAnnotations;

namespace Unycross_Web.Models
{
    public class UserTrackFeedBack
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int TrackId { get; set; }
        [Required]
        public int UserId { get; set; }
        public string? Terrain { get; set; }
        public int? Rating { get; set; }
        public string? Review { get; set; }
    }
}
