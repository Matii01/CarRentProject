using CarRent.data.DTO;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class CarMaintenanceController : BaseController
    {
        private readonly IAuthenticationService _authentication;

        public CarMaintenanceController(IServiceManager serviceManager, IAuthenticationService authentication)
            : base(serviceManager)
        {
            _authentication = authentication;
        }

        [Authorize]
        [HttpPost("AddMaintenance")]
        public async Task<IActionResult> CarMaintenance([FromBody] CarMaintenanceDto carMaintenance)
        {
            var user = User.Identity.Name;
            var userId = await _authentication.FindUserByUserName(user);

            await Console.Out.WriteLineAsync(carMaintenance.ToString());
            await Console.Out.WriteLineAsync(userId);


            var item = new CarMaintenanceDto(
                    0, carMaintenance.CarId,
                    userId,
                    carMaintenance.Description,
                    carMaintenance.DateStart,
                    carMaintenance.DateEnd,
                    carMaintenance.TotalCost
                );

            var result = await _services.CarMaintenanceService.CreateCarMaintenance(item);
            return Ok(result);
        }
    }
}
