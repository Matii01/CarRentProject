using Microsoft.AspNetCore.Mvc;
using CarRent.Service.Interfaces;
using CarRent.data.DTO;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http.HttpResults;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class CarPriceListController : BaseController
    {
        public CarPriceListController(IServiceManager serviceManager) 
            : base(serviceManager)
        {
        }

        [HttpGet("{carId:int}")]
        public async Task<IActionResult> GetPriceListForCar(int carId)
        {
            var result = await _services.PriceListService
                .GetPriceListsForCar(carId, false);

            if (result.IsNullOrEmpty()) 
            {
                return NotFound();
            }

            return Ok(result);

        }

        [HttpPost("addItem")]
        public async Task<IActionResult> AddItemToPricelist(NewtPricelistItemDto newItem)
        {
            await _services.PriceListService.AddPosition(newItem);
            
            return Ok(newItem);
        }

        [HttpPost("create/{carId:int}")]
        public async Task<IActionResult> CreateCarPriceList(PriceListDto priceList)
        {
            var exist = await _services.PriceListService
                .CarPriceListExistForThisDateTime(priceList);

            if (exist)
            {
                return Ok("pricelist for this car for this DataTime already exist");
            }
            //else
            //{
            //    return Ok("pricelist for this car will be added");
            //}
            //Add DtoObject

            var result = await _services.PriceListService.CreatePriceListForCarAsync(priceList);
            return CreatedAtAction(nameof(CreateCarPriceList), result);
        }
    }
}
