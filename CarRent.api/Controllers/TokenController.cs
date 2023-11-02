using CarRent.data.DTO;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TokenController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        public TokenController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService; 
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] TokenDto tokenDto)
        {
            var tokenToReturn = await _authenticationService.RefreshToken(tokenDto);
            return Ok(tokenToReturn);
        }

        [HttpPost("retrieve")]
        public async Task<IActionResult> RetrieveData([FromBody] TokenDto user)
        {
            var retrievedData = await _authenticationService.RetrieveData(user); 
            return Ok(retrievedData);
        }
    }
}
