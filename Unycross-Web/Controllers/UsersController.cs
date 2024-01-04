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
        public Dtos.UserDto GetUserByStoredAmaNumber(string userName, string password)
        {
            Models.User user = _unycrossContext.Users.FirstOrDefault(u => u.UserName == userName && u.Password == password);

            Dtos.UserDto userDto = new Dtos.UserDto()
            {
                UserName = user.UserName,
                Password = user.Password,
                Email = user.Email,
                AmaNumber = user.AmaNumber
            };

            return userDto;
        }

        [Route("sign-up")]
        [HttpPost]
        public Dtos.UserDto SignUpUser(string userName, string password, string email, string? amaNumber)
        {
            Models.User existingUser = _unycrossContext.Users.FirstOrDefault(u => u.UserName == userName || u.Email == email);

            if(existingUser != null)
            {
                throw new Exception("User name or email already in use");
            }
            Models.User user = new Models.User()
            {
                UserName = userName,
                Password = password,
                Email = email,
                AmaNumber = amaNumber
            };
            Dtos.UserDto userDto = new Dtos.UserDto()
            {
                UserName = userName,
                Password = password,
                Email = email,
                AmaNumber = amaNumber
            };

            _unycrossContext.Users.Add(user);
            _unycrossContext.SaveChanges();

            return userDto;
        }
    }
}
