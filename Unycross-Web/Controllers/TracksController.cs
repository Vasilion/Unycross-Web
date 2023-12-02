using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Unycross_Web.Context;

namespace Unycross_Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TracksController : ControllerBase
    {
        private readonly UnycrossContext _unycrossContext;
        public TracksController(UnycrossContext unycrossContext)
        {
            _unycrossContext = unycrossContext;
        }

        [HttpGet, Authorize(Roles = "UnyUser")]
        public IEnumerable<Models.Track> GetAllTracks()
        {
            return _unycrossContext.Tracks?.OrderBy(t => t.Id);
        }
    }
}
