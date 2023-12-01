namespace Unycross_Web.Models
{
    public class Track
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string? description { get; set; } 
        public string? longitude { get; set; }
        public string? latitude { get; set; }
        public string? slug { get; set; }
        public string? status { get; set; }

    }
}
