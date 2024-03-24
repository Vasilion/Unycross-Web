namespace Unycross_Web.Dtos
{
    public class TrackDto
    {
        public int Id { get; set; }     
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Longitude { get; set; }
        public string? Latitude { get; set; }
        public string? Slug { get; set; }
        public string? Status { get; set; }
        public string? Rating { get; set; }
        public string? Terrain { get; set; }
    }
}
