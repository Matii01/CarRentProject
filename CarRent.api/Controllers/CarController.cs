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
        //public async Task<IActionResult> GetCarsForClient([FromQuery] CarParameters parameters)
        public async Task<IActionResult> GetCarsForClient() // [FromQuery] or [FromBody] ? 
        {
            CarParameters parameters = new() { PageNumber = 2, PageSize = 2};
            var list = await _services.CarService.GetCarListForClientAsync(parameters, false);

            if(list.IsNullOrEmpty())
            {
                return NotFound();
            }

            return Ok(list);
        }

        [HttpGet("workerCars")]
        public async Task<IActionResult> GetCar()
        {
            CarParameters param= new() { PageNumber = 1, PageSize = 10 };
            var list = await _services.CarService.GetCarsAsync(param, false);

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

        [HttpGet("AllInfoForCar")]
        public async Task<IActionResult> GetAllInfoForCarCar()
        {
            return NotFound();
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateCar([FromBody] NewCarDto newCar)
        {
            var car = await _services.CarService.CreateCarAsync(newCar);
            
            return Ok(car); 
        }

        [HttpPut("edit/{id:int}")]
        public Task<IActionResult> UpdateCar([FromBody] NewCarDto car)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("delete")]
        public Task<IActionResult> DeleteCar(int id)
        {
            throw new NotImplementedException();
        }
    }
}
