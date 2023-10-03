using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using CarRent.Repository;
using CarRent.Service.Interfaces;
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
            var carTypes = await _services.CarTypeService.GetAllAsync(false); 

            return Ok(carTypes);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCarTypes([FromBody] CarTypeDto carType)
        {
            await _services.CarTypeService.CreateAsync(carType);

            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCarTypes(int id, [FromBody] CarTypeDto carType)
        {
            await _services.CarTypeService.UpdateAsync(id, carType, false);

            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteCarTypes(int id)
        {
            //return NoContent();
            throw new NotImplementedException();
        }
    }
}
