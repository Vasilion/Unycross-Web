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
            return _unycrossContext.Users.FirstOrDefault(u => u.UserName == userName && u.Password == password);
        }

        [Route("sign-up")]
        [HttpPost]
        public Models.User SignUpUser(string userName, string password, string email, string? amaNumber)
        {
            Models.User user = new Models.User()
            {
                UserName = userName,
                Password = password,
                Email = email,
                AmaNumber = amaNumber
            };

            Models.User existingUser = _unycrossContext.Users.FirstOrDefault(u => u.UserName == userName || u.Email == email);

            if(existingUser != null)
            {
                throw new Exception("User name or email already in use");
            }

            _unycrossContext.Users.Add(user);
            _unycrossContext.SaveChanges();

            return user;
        }
    }
}
