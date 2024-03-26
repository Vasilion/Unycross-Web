using Microsoft.EntityFrameworkCore;
using Unycross_Web.Context;
using Unycross_Web.Dtos;
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

        public IEnumerable<TrackDto> GetAllTracks()
        {
            IEnumerable<Track> Tracks = _unycrossContext.Tracks.OrderBy(t => t.Id);
            List<TrackDto> allTracksDto = new List<TrackDto>();

            foreach (Track track in Tracks)
            {
                TrackDto trackDto = new TrackDto()
                {
                    Id = track.Id,
                    Name = track.Name,
                    Description = track.Description,
                    Latitude = track.Latitude,
                    Longitude = track.Longitude,
                    Rating = track.Rating,
                    Slug = track.Slug,
                    Status = track.Status,
                    Terrain = track.Terrain,
                };
                allTracksDto.Add(trackDto);
            }
            return allTracksDto;
        }

        public IEnumerable<UserTrackFeedBackDto> GetAllTrackFeedBack(int trackId)
        {
            IEnumerable<UserTrackFeedBack> feedback = _unycrossContext.UsersTrackFeedBack.Where(fb => fb.TrackId == trackId);
            List<UserTrackFeedBackDto> allfeedBackDto = new List<UserTrackFeedBackDto>(); 

            foreach(UserTrackFeedBack f in feedback)
            {
                UserTrackFeedBackDto feedbackDto = new UserTrackFeedBackDto()
                {
                    TrackId = f.TrackId,
                    UserId = f.UserId,
                    Terrain = f.Terrain,
                    Rating = f.Rating,
                    Review = f.Review
                };
                allfeedBackDto.Add(feedbackDto);
            }
            return allfeedBackDto;
        }
        public UserTrackFeedBackDto UpdateUserTrackFeedBack(int trackId, int userId, string? terrain, int? rating, string? review)
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

            UserTrackFeedBackDto feedbackDto = new UserTrackFeedBackDto()
            {
                TrackId = feedback.TrackId,
                UserId = feedback.UserId,
                Terrain = feedback.Terrain,
                Rating = feedback.Rating,
                Review = feedback.Review
            };
            _unycrossContext.UsersTrackFeedBack.Add(feedback);
            _unycrossContext.SaveChanges();
            return feedbackDto;

        }

        public IEnumerable<TrackDto> GetUserFavoriteTracks(int userId)
        {
            IEnumerable<FavoriteTrack> favoriteTracks = _unycrossContext.FavoriteTrack
                .Include(ft => ft.Track)
                .Where(ft => ft.UserId == userId)
                .ToList();
            List<TrackDto> userFavoriteTracks = new List<TrackDto>();

            foreach(FavoriteTrack track in favoriteTracks)
            {
                TrackDto favTrack = new TrackDto()
                {
                    Id = track.Track.Id,
                    Name = track.Track.Name,
                    Latitude = track.Track.Latitude,
                    Longitude = track.Track.Longitude,
                };
                userFavoriteTracks.Add(favTrack);
            }
            return userFavoriteTracks;

        }

        public FavoriteTrackDto AddToUserFavoriteTracks(FavoriteTrackDto track)
        {
            FavoriteTrack favoriteTrack = new FavoriteTrack()
            {
                UserId = track.UserId,
                TrackId = track.TrackId
            };
            _unycrossContext.FavoriteTrack.Add(favoriteTrack);
            _unycrossContext.SaveChanges();
            return track;

        }

        public FavoriteTrackDto RemoveFromUserFavoriteTracks(FavoriteTrackDto track)
        {
            FavoriteTrack favoriteTrack = _unycrossContext.FavoriteTrack.FirstOrDefault(t => t.UserId == track.UserId && t.TrackId == track.TrackId);

            if(favoriteTrack == null)
            {
                throw new FileNotFoundException($"Favorite track does not exist on user ID {track.UserId}.");
            }
            _unycrossContext.FavoriteTrack.Remove(favoriteTrack);
            _unycrossContext.SaveChanges();
            return track;

        }
    }
}
