using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Unycross_Web.Context;
using Unycross_Web.Models;
using Unycross_Web.Services;

namespace Unycross_Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TracksController : ControllerBase
    {
        private readonly UnycrossContext _unycrossContext;
        private readonly TrackService _trackService;
        public TracksController(UnycrossContext unycrossContext, TrackService trackService)
        {
            _unycrossContext = unycrossContext;
            _trackService = trackService;
        }

        [HttpGet, Authorize(Roles = "UnyUser")]
        public IEnumerable<Models.Track> GetAllTracks()
        {
            return _unycrossContext.Tracks.OrderBy(t => t.Id);
        }

        [Route("UpdateUserTrackFeedBack")]
        [HttpPost, Authorize(Roles = "UnyUser")]
        public UserTrackFeedBack UpdateUserTrackFeedBack(int trackId, int userId, string? terrain, int? rating, string? review )
        {
            return _trackService.UpdateUserTrackFeedBack(trackId, userId, terrain, rating, review); 

        }
    }
}
