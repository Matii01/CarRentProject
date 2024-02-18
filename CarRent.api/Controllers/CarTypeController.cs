using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using CarRent.Repository;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class CarTypeController : BaseController
    {
        public CarTypeController(IServiceManager service) : base(service)
        {

        }

        [HttpGet]
        public async Task<IActionResult> GetCarTypes()
        {
            var carTypes = await _services.CarTypeService.GetAllActiveAsync(false); 
            return Ok(carTypes);
        }

        [Authorize(Roles = "Administrator,CarDetailsEditor")]
        [HttpPost]
        public async Task<IActionResult> CreateCarTypes([FromBody] CarTypeDto carType)
        {
            var newCarType = await _services.CarTypeService.CreateAsync(carType);

            return Ok(newCarType);
        }

        [Authorize(Roles = "Administrator,CarDetailsEditor")]
        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> UpdateCarTypes(int id, [FromBody] CarTypeDto carType)
        {
            await _services.CarTypeService.UpdateAsync(id, carType, true);

            return NoContent();
        }

        [Authorize(Roles = "Administrator,CarDetailsEditor")]
        [HttpDelete("delete/{id:int}")]
        public async Task<IActionResult> DeleteCarTypes(int id)
        {
            await _services.CarTypeService.DeleteAsync(id);
            return NoContent();
        }
    }
}
