using CarRent.data.DTO;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    // ToDo create service 

    [Route("[controller]")]
    public class CarMakeController : ControllerBase
    {
        private readonly ICarMakeService _carMakeService;

        public CarMakeController(ICarMakeService carMakeService)
        {
            _carMakeService = carMakeService;
        }
      

        [HttpGet("all")]
        public async Task<IActionResult> GetCarMakes()
        {
            //var list = await _context.CarMakes.ToListAsync();
            var list = await _carMakeService.GetAllCarMakesAsync(false);

            return Ok(list);
        }

        [HttpGet("get/{id:int}")]
        public async Task<IActionResult> GetCarMakesById(int id)
        {
            //var carMake = await _context.CarMakes.Where(x => x.Id.Equals(id)).SingleOrDefaultAsync();
            var carMake = await _carMakeService.GetCarMakeAsync(id, false);

            return Ok(carMake);
        }

        [HttpGet(Name = "CarMake")]
        public async Task<IActionResult> GetActiveCarMakes()
        {
            // ToDo 
            var list = await _carMakeService.GetAllCarMakesAsync(false);

            return Ok(list);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateCarMake([FromBody] CarMakeDto carMake)
        {
            var createdCarMake = await _carMakeService.CreateCarMakeAsync(carMake);
           

            return CreatedAtAction(nameof(CreateCarMake), new {Id = createdCarMake.Id}, createdCarMake);
        }

        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> UpdateCarMake(int id, [FromBody] CarMakeDto carMake)
        {
            await _carMakeService.UpdateCarMakeAsync(id, carMake, trackChanges: false);

            return NoContent();
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteCarMake(int id)
        {

            return NoContent();
        }
    }
}
