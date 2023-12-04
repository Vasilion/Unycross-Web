using System.ComponentModel.DataAnnotations;

namespace Unycross_Web.Models
{
    public class Track
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string? Description { get; set; } 
        public string? Longitude { get; set; }
        public string? Latitude { get; set; }
        public string? Slug { get; set; }
        public string? Status { get; set; }
        public string? Rating { get; set; }        
        public string? Terrain { get; set; }

    }
}
