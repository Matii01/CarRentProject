using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Parameters;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;

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
        public async Task<IActionResult> GetCarsForClient([FromQuery] CarParameters parameters)
        {
            var list = await _services.CarService.GetCarListForClientAsync(parameters, false);

            if (list.Items.IsNullOrEmpty())
            {
                return NotFound();
            }

            return Ok(list);
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpGet("workerCars")]
        public async Task<IActionResult> GetCars([FromQuery] CarParameters parameters)
        {
            var list = await _services.CarService.GetCarsForWorkerAsync(parameters, false);

            if (list.Items.IsNullOrEmpty())
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
                return NotFound("Car not found");
            }

            return Ok(car);
        }

        [HttpGet("details/{id:int}")]
        public async Task<IActionResult> GetCarDetailsForClient(int id)
        {
            var carDetails = await _services.CarService.GetCarDetailsForClientAsync(id);
            carDetails.ExcludedDates = await _services.RentalService.GetFutureRentalDatesForCarAsync(id);

            if(carDetails is null)
            {
                return NotFound();
            }
            return Ok(carDetails);
        }

        [HttpGet("CarSortingInfo")]
        public async Task<IActionResult> GetInfoForCarSorting()
        {
            var carSortingInfo = new InfoForSortingCar(
                GearboxType: await _services.GearboxTypeService.GetAllActiveAsync(false),
                EngineType: await _services.EngineTypeService.GetAllActiveAsync(false),
                CarMakes: await _services.CarMakeService.GetAllActiveCarMakesAsync(false),
                CarType: await _services.CarTypeService.GetAllActiveAsync(false)
            );

            return Ok(carSortingInfo);
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

        
        [HttpGet("isRecommended/{id:int}")]
        public async Task<IActionResult> GetIsCarRecommended(int id)
        {
            var value = await _services.CarService.IsCarRecommendedAsync(id);
            return Ok(value);
        }

        [HttpGet("recommended")]
        public async Task<IActionResult> GetRecommendedCars()
        {
            var list = await _services.CarService.GetRecommended();
            return Ok(list);
        }

        [HttpGet("carsForDates")]
        public async Task<IActionResult> GetAvailableCarsForDates([FromQuery] NewRentalForClient dates)
        {
            await Console.Out.WriteLineAsync("get available cars");
            var list = await _services.CarService.GetAvailableCarsInDates(dates);
            return Ok(list);
        }

        [HttpGet("carsAndPriceForDates")]
        public async Task<IActionResult> GetAvailableCarsWithPriceForDates([FromQuery] NewRentalForClient dates)
        {
            await Console.Out.WriteLineAsync("get available cars");
            var list = await _services.CarService.GetAvailableCarsWithPriceForDatesAsync(dates);
            return Ok(list);
        }

        [Authorize(Roles = "Administrator,CarAdd")]
        [HttpPost("create")]
        public async Task<IActionResult> CreateCar([FromBody] NewCarDto newCar)
        {
            var car = await _services.CarService.CreateCarAsync(newCar);
            
            return Ok(""); 
        }

        [Authorize(Roles = "Administrator,CarEditor")]
        [HttpPost("addRecommended/{id:int}")]
        public async Task<IActionResult> AddRecommended(int id)
        {
            await _services.CarService.AddToRecommendedAsync(id);
            return Ok();
        }

        [Authorize(Roles = "Administrator,CarEditor")]
        [HttpPut("edit/{id:int}")]
        public async Task<IActionResult> UpdateCar(int id, [FromBody] NewCarDto car)
        {
            await _services.CarService.UpdateCarAsync(id, car, true);

            return NoContent();
        }

        [Authorize(Roles = "Administrator,CarEditor")]
        [HttpPost("removeRecommended/{id:int}")]
        public async Task<IActionResult> RemoveFromRecommended(int id)
        {
            await _services.CarService.RemoveRecommendedAsync(id);
            return NoContent();
        }


        [Authorize(Roles = "Administrator,CarEditor")]
        [HttpPost("setVisibility/{id:int}")]
        public async Task<IActionResult> SetCarVisibility(int id, [FromBody] bool IsVisible)
        {
            await Console.Out.WriteLineAsync("set visibility");
            await _services.CarService.SetCarVisibility(id, IsVisible);
            return NoContent();
        }

        [Authorize(Roles = "Administrator,CarEditor")]
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
        [Authorize(Roles = "Administrator,CarEditor")]
        [HttpPost("uploadCarImage")]
        public async Task<IActionResult> UploadCarImage([FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file is uploaded.");
            }

            //var path = "C:\\Users\\msi\\source\\repos\\Project\\CarRentProject\\CarRent.websiteTs\\public";
            var newPath = "D:\\React\\Tests\\react-app-test\\public";
            var targetDirectory = Path.Combine(newPath, "CarImages");
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
