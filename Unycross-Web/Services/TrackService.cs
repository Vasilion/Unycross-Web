using Unycross_Web.Context;
using Unycross_Web.Models;

namespace Unycross_Web.Services
{
    public class TrackService
    {
        private readonly UnycrossContext _unycrossContext;
        public TrackService(UnycrossContext unycrossContext)
        {
            _unycrossContext = unycrossContext;
        }
        public UserTrackFeedBack UpdateUserTrackFeedBack(int trackId, int userId, string? terrain, int? rating, string? review)
        {
            UserTrackFeedBack feedback = _unycrossContext.UsersTrackFeedBack.FirstOrDefault(fb => fb.TrackId == trackId && fb.UserId == userId);

            if (feedback == null)
            {
                feedback = new UserTrackFeedBack()
                {
                    TrackId = trackId,
                    UserId = userId,
                    Terrain = terrain,
                    Rating = rating,
                    Review = review
                };
                _unycrossContext.UsersTrackFeedBack.Add(feedback);
                _unycrossContext.SaveChanges();
                return feedback;
            }

            if (terrain != null)
            {
                feedback.Terrain = terrain;
            }
            if (rating != null)
            {
                feedback.Rating = rating;
            }
            if (review != null)
            {
                feedback.Review = review;
            }
            return feedback;

        }
    }
}
