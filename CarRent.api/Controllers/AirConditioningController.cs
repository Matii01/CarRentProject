using CarRent.data.DTO;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class AirConditioningController : BaseController
    {
        public AirConditioningController(IServiceManager serviceManager) 
            : base(serviceManager)
        {
        }

        [HttpGet]
        public async Task<IActionResult> GetAirConditioning()
        {
            var items = await _services.AirConditioningTypeService.GetAllActiveAsync(false);
            return Ok(items);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAirConditioning([FromBody] AirConditioningTypeDto type)
        {
            var created = await _services.AirConditioningTypeService.CreateAsync(type);
            return Ok(created);
        }

        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> UpdateAirConditioning(int id, [FromBody] AirConditioningTypeDto type)
        {
            await _services.AirConditioningTypeService.UpdateAsync(id, type, true);

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteAirConditioning(int id)
        {
            await _services.AirConditioningTypeService.DeleteAsync(id);
            return NoContent();
        }
    }
}
