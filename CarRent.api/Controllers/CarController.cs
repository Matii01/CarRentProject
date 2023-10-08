using CarRent.data.DTO;
using CarRent.Repository.Parameters;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class CarController : BaseController
    {
        public CarController(IServiceManager serviceManager) 
            : base(serviceManager)
        {
        }

        [HttpGet("cars")]
        //public async Task<IActionResult> GetCars([FromBody] CarParameters parameters)
        public async Task<IActionResult> GetCars()
        {
            CarParameters parameters = new() { PageNumber = 1, PageSize = 10};
            var list = await  _services.CarService.GetCarListForClientAsync(parameters, false);

            if(list.IsNullOrEmpty())
            {
                return NotFound();
            }

            return Ok(list);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetCarById(int id)
        {
            var car = await _services.CarService.GetCarById(id, false);
            if (car == null)
            {
                return NotFound();
            }

            return Ok(car);
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateCar([FromBody] NewCarDto newCar)
        {
            var car = await _services.CarService.CreateCarAsync(newCar);
            
            return Ok(car); 
        }
    }
}
