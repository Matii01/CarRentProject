using CarRent.data.DTO;
using CarRent.data.Models.User;
using CarRent.Repository.Parameters;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class RabatController : BaseController
    {
        private readonly UserManager<User> _userManager;

        public RabatController(IServiceManager serviceManager, UserManager<User> userManager) 
            : base(serviceManager)
        {
            _userManager = userManager;
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpGet("userRabat/{userId}")]
        public async Task<IActionResult> GetUserRabat(string userId)
        {
            var list = await _services.RabatService.GetUserRabats(userId);
            return Ok(list);
        }

        [Authorize(Roles = "User")]
        [HttpGet("myRabats")]
        public async Task<IActionResult> GetUserRabat()
        {
            var username = User.Identity.Name;
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound();
            }

            var list = await _services.RabatService.GetUserRabats(user.Id);
            return Ok(list);
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpGet("carRabats/{carId}")]
        public async Task<IActionResult> GetCarRabats(int carId)
        {
            var list = await _services.RabatService.GetCarRabats(carId);
            return Ok(list);
        }

        [Authorize(Roles = "Administrator,CarEditor")]
        [HttpPost("addCarRabat/{carId:int}")]
        public async Task<IActionResult> AddCarRabat(int carId, [FromBody] CarRabatDto rabatDto)
        {
            await _services.RabatService.AddCarRabat(carId, rabatDto);
            return Ok();
        }

        [Authorize(Roles ="Administrator,UserEditor")]
        [HttpPost("addUserRabat")]
        public async Task<IActionResult> AddRabat([FromBody] NewRabatForUserDto rabat)
        {
            await _services.RabatService.AddRabatForUser(rabat);
            return Ok();
        }

        [Authorize(Roles = "Administrator,CarEditor")]
        [HttpDelete("deleteCarRabat/{id:int}")]
        public async Task<IActionResult> DeleteCarRabat(int id)
        {
            await _services.RabatService.DeleteCarRabat(id);
            return Ok();
        }

        [Authorize(Roles = "Administrator,UserEditor")]
        [HttpDelete("deleteUserRabat/{id:int}")]
        public async Task<IActionResult> DeleteUserRabat(int id)
        {
            await _services.RabatService.DeleteUserRabat(id);
            return Ok();
        }
    }
}
