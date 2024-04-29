using CarRent.data.DTO;
using CarRent.Repository.Parameters;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    public class CarMaintenanceController : BaseController
    {
        private readonly IAuthenticationService _authentication;

        public CarMaintenanceController(IServiceManager serviceManager, IAuthenticationService authentication)
            : base(serviceManager)
        {
            _authentication = authentication;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMaintenanceByID(int id)
        {
            var item = await _services.CarMaintenanceService.GetCarMaintenanceByIdAsync(id, false);
            return Ok(item);
        }

        [HttpGet("All")]
        public async Task<IActionResult> AllMaintenance([FromQuery] MaintenanceParameters param)
        {
            var list = await _services.CarMaintenanceService.GetCarMaintenanceListAsync(param);
            return Ok(list);
        }

        [Authorize]
        [HttpPost("AddMaintenance")]
        public async Task<IActionResult> CarTestMaintenance([FromBody] NewCarMaintenanceDto carMaintenance)
        {
            var user = User.Identity.Name;
            var userId = await _authentication.FindUserByUserName(user);

            var item = new CarMaintenanceDto(
                    0, 
                    carMaintenance.CarId,
                    userId,
                    carMaintenance.Description,
                    carMaintenance.Remarks,
                    carMaintenance.DateStart,
                    carMaintenance.DateEnd,
                    carMaintenance.TotalCost
                );

            var result = await _services.CarMaintenanceService.CreateCarMaintenance(item);
            return Ok(result);
        }

        [Authorize]
        [HttpPost("EditMaintenance/{id}")]
        public async Task<IActionResult> EditMaintenance(int id, [FromBody] CarMaintenanceDto carMaintenance)
        {
            var user = User.Identity.Name;
            var userId = await _authentication.FindUserByUserName(user);

            var result = await _services.CarMaintenanceService.EditCarMaintenanceAsync(id, carMaintenance, userId);
            return Ok(result);
        }
    }
}

