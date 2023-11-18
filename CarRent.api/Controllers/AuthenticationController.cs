using CarRent.data.DTO;
using CarRent.data.Models.User;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IAuthenticationService _authenticationService;
        public AuthenticationController(UserManager<User> userManager, IAuthenticationService authenticationService)
        {
            _userManager = userManager;
            _authenticationService = authenticationService;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterUser([FromBody] UserForRegistrationDto newUser)
        {
            newUser.Roles = new string[] { "User" };

            //await Console.Out.WriteLineAsync("Try to add new user ");
            //await Console.Out.WriteLineAsync(newUser.FirstName.ToString());
            //await Console.Out.WriteLineAsync(newUser.LastName.ToString());
            //await Console.Out.WriteLineAsync(newUser.UserName.ToString());
            //await Console.Out.WriteLineAsync(newUser.Password.ToString());
            //await Console.Out.WriteLineAsync(newUser.Email.ToString());
            //await Console.Out.WriteLineAsync(newUser.PhoneNumber.ToString());

            //foreach(var role in newUser.Roles)
            //{
            //    await Console.Out.WriteLineAsync(role);
            //}
            //await Console.Out.WriteLineAsync(newUser.Roles.ToString());

            var result = await _authenticationService.RegisterUser(newUser);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.TryAddModelError(error.Code, error.Description);
                }
                return BadRequest(ModelState);
            }
            return StatusCode(201);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("registerNewWorker")]
        public async Task<IActionResult> RegisterNewWorker([FromBody] UserForRegistrationDto newWorker)
        {
            return StatusCode(201);
            //throw new NotImplementedException();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Authenticate([FromBody] UserForAuthenticationDto user)
        {
            if (!await _authenticationService.ValidateUser(user))
                return Unauthorized();

            var loginDate = await _authenticationService.Login(true);
            // var tokenDto = await _authenticationService.CreateToken(true);
            return Ok(loginDate);
        }

        
    }
}
