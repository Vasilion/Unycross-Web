using System.ComponentModel.DataAnnotations;

namespace Unycross_Web.Models
{
    public class Rider
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public string? AmaNumber { get; set; }
    }
}
