using System.ComponentModel.DataAnnotations;

namespace Unycross_Web.Dtos
{
    public class UserDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
        public string? AmaNumber { get; set; }
        public string? Email { get; set; }
    }
}
