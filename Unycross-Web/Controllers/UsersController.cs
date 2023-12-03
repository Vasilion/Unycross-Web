using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Unycross_Web.Context;

namespace Unycross_Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UnycrossContext _unycrossContext;

        public UsersController(UnycrossContext unycrossContext)
        {
            _unycrossContext = unycrossContext;
        }

        [HttpGet, Authorize(Roles = "UnyUser")]
        public Models.User GetUserByStoredAmaNumber(string userName, string password)
        {
            return _unycrossContext.Users?.FirstOrDefault(u => u.UserName == userName && u.Password == password);
        }
    }
}
