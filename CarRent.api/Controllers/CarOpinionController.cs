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
    public class CarOpinionController : BaseController
    {
        private readonly UserManager<User> _userManager;

        public CarOpinionController(UserManager<User> userManager, IServiceManager serviceManager) 
            : base(serviceManager)
        {
            _userManager = userManager;
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

            var username = User.Identity.Name;
            var user = await _userManager.FindByNameAsync(username);

            await _services.CarOpinionService.AddOpinionAsync(opinion, user.Id);
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
