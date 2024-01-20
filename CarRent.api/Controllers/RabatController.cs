using CarRent.data.DTO;
using CarRent.Repository.Parameters;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class RabatController : BaseController
    {
        public RabatController(IServiceManager serviceManager) 
            : base(serviceManager)
        {
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpGet("userRabat/{userId}")]
        public async Task<IActionResult> GetUserRabat(string userId)
        {
            var list = await _services.RabatService.GetUserRabats(userId);
            return Ok(list);
        }

        [Authorize(Roles ="Administrator,Worker")]
        [HttpPost("addUserRabat")]
        public async Task<IActionResult> AddRabat([FromBody] NewRabatForUserDto rabat)
        {
            await _services.RabatService.AddRabatForUser(rabat);
            return Ok();
        }
        //deleteUserRabat
        [Authorize(Roles = "Administrator,Worker")]
        [HttpDelete("deleteUserRabat/{id:int}")]
        public async Task<IActionResult> AddRabat(int id)
        {
            await _services.RabatService.DeleteUserRabat(id);
            return Ok();
        }
    }
}
