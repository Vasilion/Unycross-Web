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

        [HttpGet]
        public ActionResult GetAllTracks()
        {
            return Ok(_unycrossContext.Tracks?.OrderBy(t => t.Id));
        }
    }
}
