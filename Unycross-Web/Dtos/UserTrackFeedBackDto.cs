namespace Unycross_Web.Dtos
{
    public class UserTrackFeedBackDto
    {
        public int Id { get; set; }    
        public int TrackId { get; set; }
        public int UserId { get; set; }
        public string? Terrain { get; set; }
        public int? Rating { get; set; }
        public string? Review { get; set; }
    }
}
