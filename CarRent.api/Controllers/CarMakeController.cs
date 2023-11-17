using CarRent.data.DTO;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    // ToDo create service 

    [Route("[controller]")]
    public class CarMakeController : BaseController
    {
        public CarMakeController(IServiceManager service) 
            : base(service)
        {
        }
      

        [HttpGet("all")]
        public async Task<IActionResult> GetCarMakes()
        {
            //var list = await _context.CarMakes.ToListAsync();
            var list = await _services.CarMakeService.GetAllCarMakesAsync(false);

            return Ok(list);
        }

        [HttpGet("get/{id:int}")]
        public async Task<IActionResult> GetCarMakesById(int id)
        {
            //var carMake = await _context.CarMakes.Where(x => x.Id.Equals(id)).SingleOrDefaultAsync();
            var carMake = await _services.CarMakeService.GetCarMakeAsync(id, false);

            return Ok(carMake);
        }

        [HttpGet(Name = "CarMake")]
        public async Task<IActionResult> GetActiveCarMakes()
        {
            // ToDo 
            var list = await _services.CarMakeService.GetAllActiveCarMakesAsync(false);

            return Ok(list);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateCarMake([FromBody] CarMakeDto carMake)
        {
            var createdCarMake = await _services.CarMakeService.CreateCarMakeAsync(carMake);

            var toReturn = new CarMakeDto(createdCarMake.Id, createdCarMake.Name, createdCarMake.Description);
            
            return CreatedAtAction(nameof(CreateCarMake), toReturn);
        }

        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> UpdateCarMake(int id, [FromBody] CarMakeDto carMake)
        {
            await _services.CarMakeService.UpdateCarMakeAsync(id, carMake, trackChanges: true);

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteCarMake(int id)
        {
            await _services.CarMakeService.DeleteAsync(id);
            return NoContent();
        }
    }
}
