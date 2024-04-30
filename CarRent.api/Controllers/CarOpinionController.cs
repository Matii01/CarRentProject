using CarRent.data.DTO;
using CarRent.data.Models.User;
using CarRent.Repository.Parameters;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
namespace CarRent.api.Controllers
{
    public class CarOpinionController : ControllerWithUserManager
    {
        public CarOpinionController(IServiceManager serviceManager, UserManager<User> userManager) 
            : base(serviceManager, userManager)
        {
        }

        [HttpGet("{carId:int}")]
        public async Task<IActionResult> GetOpinionForCar(int carId)
        {
            var list = await _services.CarOpinionService.GetOpinionsForCarAsync(carId);
            return Ok(list);
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllOpinion([FromQuery] OpinionParameters param)
        {
            var list = await _services.CarOpinionService.GetOpinionsAsync(param);
            return Ok(list);
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("hide/{id:int}")]
        public async Task<IActionResult> HideOpinion(int id)
        {
            await _services.CarOpinionService.HideOpinionAsync(id);
            return Ok("");  
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("accept/{id:int}")]
        public async Task<IActionResult> AcceptOpinion(int id)
        {
            await _services.CarOpinionService.AcceptOpinionAsync(id);
            return Ok("");
        }

        [Authorize(Roles = "User")]
        [HttpPost("create")]
        public async Task<IActionResult> CreateOpinion([FromBody] NewOpinionDto opinion)
        {
            var validationResult = await ValidateUser();
            if (!validationResult.IsSuccess || validationResult.User == null)
            {
                return Unauthorized();
            }

            await _services.CarOpinionService.AddOpinionAsync(opinion, validationResult.User.Id);
            return Ok("");
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteOpinion(int id)
        {
            await _services.CarOpinionService.DeleteOpinionAsync(id);
            return Ok("");
        }
    }
}
