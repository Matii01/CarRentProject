using CarRent.data.DTO;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    public class EngineTypeController : BaseController
    {
        public EngineTypeController(IServiceManager serviceManager)
            : base(serviceManager)
        {
        
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllEngineTypes()
        {
            var list = await _services.EngineTypeService.GetAllActiveAsync(false);
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

        [Authorize(Roles = "Administrator,CarDetailsEditor")]
        [HttpPost("create")]
        public async Task<IActionResult> CreateEngineType([FromBody] EngineTypeDto engineType)
        {
            var createdEngineType = await _services.EngineTypeService.CreateAsync(engineType);

            return CreatedAtAction(nameof(CreateEngineType), createdEngineType);
        }


        [Authorize(Roles = "Administrator,CarDetailsEditor")]
        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> UpdateCarDrive(int id, [FromBody] EngineTypeDto EngineType)
        {
            await _services.EngineTypeService.UpdateAsync(id, EngineType, trackChanges: true);

            return StatusCode(201);
        }

        [Authorize(Roles = "Administrator,CarDetailsEditor")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteEngineType(int id)
        {
            await _services.EngineTypeService.DeleteAsync(id);
            return NoContent();
        }
    }
}
