using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Unycross_Web.Context;

namespace Unycross_Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RidersController : ControllerBase
    {
        private readonly UnycrossContext _unycrossContext;

        public RidersController(UnycrossContext unycrossContext)
        {
            _unycrossContext = unycrossContext;
        }

        [HttpGet]
        public IEnumerable<Models.Rider> GetAllRiders()
        {
            // needs dto, but not sure im even using this for anything?
            return _unycrossContext.Riders?.OrderBy(p => p.Id);
        }

    }
}
