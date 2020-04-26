using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SPS.AEM.Repository.Interfaces;
using SPS.AEM.Repository.Models;

namespace SPS.AEM.Web.Controllers
{
    [ApiController]
    [EnableCors("AllowOrigin")]
    [Route("contextapi/user")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository userRepository;

        public UserController(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        [HttpPost]
        [Route("validatecredentials")]
        public async Task<IActionResult> ValidateUserCredentials([FromBody] UserCredentialsDto user)
        {
            return Ok(await userRepository.ValidateUserCredentials(user));
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Post([FromBody] UserDto user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await userRepository.AddUserAsync(user);
            return Created($"contextapi/user/{user.Id}", user);
        }
    }
}