﻿using CarRent.data.DTO;
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
        public async Task<IActionResult> GetCars()
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
                return NotFound("Car not found");
            }

            return Ok(car);
        }

        [HttpGet("AllInfoForCar")]
        public async Task<IActionResult> GetAllInfoForCarCar()
        {
            var allCarInfo =  new AllInfoForNewCar(
                CarMakes: await _services.CarMakeService.GetAllActiveCarMakesAsync(false),
                CarType: await _services.CarTypeService.GetAllActiveAsync(false),
                EngineType: await _services.EngineTypeService.GetAllActiveAsync(false),
                GearboxType: await _services.GearboxTypeService.GetAllActiveAsync(false),
                KilometrLimit: await _services.KilometrLimitService.GetAllActiveAsync(false),
                CarDrive: await _services.CarDriveService.GetAllActiveAsync(false),
                AirConditioningType: await _services.AirConditioningTypeService.GetAllActiveAsync(false)
             );
            
            
            return Ok(allCarInfo);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateCar([FromBody] NewCarDto newCar)
        {
            var car = await _services.CarService.CreateCarAsync(newCar);
            
            return Ok(car); 
        }

        [HttpPut("edit/{id:int}")]
        public async Task<IActionResult> UpdateCar(int id, [FromBody] NewCarDto car)
        {
            await _services.CarService.UpdateCarAsync(id, car, true);

            return NoContent();
        }

        [HttpDelete("delete")]
        public Task<IActionResult> DeleteCar(int id)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Store file in folder and return path to stored file
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        [HttpPost("uploadCarImage")]
        public async Task<IActionResult> UploadCarImage([FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file is uploaded.");
            }

            var path = "C:\\Users\\msi\\source\\repos\\Project\\CarRentProject\\CarRent.websiteTs\\public";
            var targetDirectory = Path.Combine(path, "CarImages");
            var filePath = Path.Combine(targetDirectory, file.FileName);

            if (!Directory.Exists(targetDirectory))
            {
                return BadRequest("The directory does not exist");
            }

            if (System.IO.File.Exists(filePath))
            {
                await Console.Out.WriteLineAsync("file exist");
                return Ok(new { path = file.FileName });
            }

            using (var stream = System.IO.File.Create(filePath))
            {
                await file.CopyToAsync(stream);
            }

            return Ok(new { path = file.FileName });
        }
    }
}
