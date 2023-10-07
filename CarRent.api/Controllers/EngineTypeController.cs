using CarRent.data.DTO;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class EngineTypeController : BaseController
    {
        public EngineTypeController(IServiceManager serviceManager)
            : base(serviceManager)
        {
        
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllEngineTypes()
        {
            var list = await _services.EngineTypeService.GetAllAsync(false);
            return Ok(list);
        }

        [HttpGet]
        public async Task<IActionResult> GetActiveEngineTypes()
        {
            var list = await _services.EngineTypeService.GetAllAsync(false);
            return Ok(list);
        }

        [HttpGet("get/{id:int}")]
        public async Task<IActionResult> GetEngineTypesById(int id)
        {
            var engineType = await _services.EngineTypeService.GetAsync(id, false);
            return Ok(engineType);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateEngineType([FromBody] EngineTypeDto engineType)
        {
            var createdEngineType = await _services.EngineTypeService.CreateAsync(engineType);
            return CreatedAtAction(nameof(CreateEngineType), new { createdEngineType.Id, engineType });
        }

        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> UpdateCarDrive(int id, [FromBody] EngineTypeDto EngineType)
        {
            await _services.EngineTypeService.UpdateAsync(id, EngineType, trackChanges: true);

            return NoContent();
        }

        [HttpDelete("delete")]
        public Task<IActionResult> DeleteEngineType(int id)
        {
            throw new NotImplementedException();
        }
    }
}
