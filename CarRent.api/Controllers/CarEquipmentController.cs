using CarRent.data.DTO;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class CarEquipmentController : BaseController
    {
        public CarEquipmentController(IServiceManager serviceManager)
            : base(serviceManager)
        {

        }

        [HttpGet]
        public async Task<IActionResult> GetCarEquipment()
        {
            var list = await _services.CarEquipmentService.GetAllAsync();
            return Ok(list);
        }

        [HttpGet("get/{id:int}")]
        public async Task<IActionResult> GetCarEquipmentById(int id)
        {
            var item = await _services.CarEquipmentService.GetByIdAsync(id);
            return Ok(item);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateCarEquipment([FromBody] CarEquipmentDto equipment)
        {
            var created = await _services.CarEquipmentService.CreateAsync(equipment);
            return CreatedAtAction(nameof(CreateCarEquipment), created);
        }

        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> UpdateCarEquipment(int id, [FromBody] CarEquipmentDto equipment)
        {
            await _services.CarEquipmentService.UpdateAsync(id, equipment);
            return NoContent();
        }


        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteCarEquipment(int id)
        {
            await _services.CarEquipmentService.DeleteAsync(id);
            return NoContent();
        }
    }
}
