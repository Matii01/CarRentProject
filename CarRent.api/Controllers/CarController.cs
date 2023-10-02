using CarRent.data.RequestFeatures;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace CarRent.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CarController : ControllerBase
    {
        private readonly ICarService _carService;

        public CarController(ICarService carService)
        {
            _carService = carService;
        }

        [HttpGet(Name ="GetCars")]
        public async Task<IActionResult> GetCars([FromBody] CarParameters parameters)
        {
            var list = await _carService.GetCarListForClient(parameters);

            if(list.IsNullOrEmpty())
            {
                return NotFound();
            }

            return Ok(list);
        }

        public async Task<IActionResult> GetCarById(int id)
        {
            var car = await _carService.GetCarDetailsForClient(id);
            if (car == null)
            {
                return NotFound();
            }

            return Ok(car);
        }
    }
}
