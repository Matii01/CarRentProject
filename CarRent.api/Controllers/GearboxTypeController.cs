using CarRent.data.DTO;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class GearboxTypeController : BaseController
    {
        public GearboxTypeController(IServiceManager serviceManager) 
            : base(serviceManager)
        {
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllGearboxTypes()
        {
            var gearboxTypes = await _services.GearboxTypeService.GetAllAsync(false);
            return Ok(gearboxTypes);
        }

        [HttpGet]
        public async Task<IActionResult> GetActiveGearboxTypes()
        {
            var gearboxTypes = await _services.GearboxTypeService.GetAllActiveAsync(false);
            return Ok(gearboxTypes);
        }

        [HttpGet("get/{id:int}")]
        public async Task<IActionResult> GetGearboxTypeById(int id)
        {
            var gearbox = await _services.GearboxTypeService.GetAsync(id, trackChanges: false);
            return Ok(gearbox);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateGearboxType([FromBody] GearboxTypeDto gearboxType)
        {
            var createdGearbox = await _services.GearboxTypeService.CreateAsync(gearboxType);
            return CreatedAtAction(nameof(CreateGearboxType), new { createdGearbox });
        }

        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> UpdateGearboxType(int id, [FromBody] GearboxTypeDto gearboxType)
        {
            await _services.GearboxTypeService.UpdateAsync(id, gearboxType, trackChanges: true);
            return NoContent();
        }

        [HttpDelete("delete")]
        public Task<IActionResult> DeleteGearboxType(int id)
        {
            throw new NotImplementedException();
        }
    }
}
