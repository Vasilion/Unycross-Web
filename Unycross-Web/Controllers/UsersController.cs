using Microsoft.AspNetCore.Mvc;
using Unycross_Web.Context;
using Unycross_Web.Dtos;
using Unycross_Web.Models;

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

        [HttpGet]
        public UserDto GetUserByStoredAmaNumber(string userName, string password)
        {
            User user = _unycrossContext.Users.FirstOrDefault(u => u.UserName == userName && u.Password == password);

            UserDto userDto = new UserDto()
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
        public UserDto SignUpUser(string userName, string password, string email, string? amaNumber)
        {
            User existingUser = _unycrossContext.Users.FirstOrDefault(u => u.UserName == userName || u.Email == email);

            if(existingUser != null)
            {
                throw new Exception("User name or email already in use");
            }
            User user = new User()
            {
                UserName = userName,
                Password = password,
                Email = email,
                AmaNumber = amaNumber
            };
            UserDto userDto = new UserDto()
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
