using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Unycross_Web.Context;
using Unycross_Web.Models;

namespace Unycross_Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UnycrossContext _unycrossContext;

        public AuthController(UnycrossContext unycrossContext)
        {
            _unycrossContext = unycrossContext;
        }
        [HttpPost("login")]
        public IActionResult Login([FromBody] Login user)
        {
            if (user is null)
            {
                return BadRequest("Invalid client request");
            }

            User storedUser = _unycrossContext?.Users?.FirstOrDefault(su => su.UserName == user.UserName && su.Password == user.Password);

            if (storedUser == null)
            {
                throw new NullReferenceException("Invalid Login.");
            }

            if (storedUser != null)
            {
                
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Role, "UnyUser")
                };
                var tokeOptions = new JwtSecurityToken(
                    issuer: "https://localhost:7224",
                    audience: "https://localhost:7224",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

                return Ok(new AuthenticatedResponse { Token = tokenString });
            }

            return Unauthorized();
        }
    }
}
