using Microsoft.AspNetCore.Mvc;
using CarRent.Service.Interfaces;
using CarRent.data.DTO;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class CarPriceListController : BaseController
    {
        public CarPriceListController(IServiceManager serviceManager) 
            : base(serviceManager)
        {
        }

        [HttpPost("addItem")]
        public async Task<IActionResult> AddItemToPricelist(NewtPricelistItemDto newItem)
        {
            await _services.PriceListService.AddPosition(newItem);
            
            return Ok(newItem);
        }

        [HttpPost("create/{carId:int}")]
        public async Task<IActionResult> CreateCarPriceList(int carId)
        {
            var carPriceList = await _services.PriceListService.CarPriceListExist(carId);

            if (carPriceList)
            {
                return Ok("pricelist for this car already exist");
            }

            //Add DtoObject

            var result = await _services.PriceListService.CreatePriceListForCarAsync(carId);
            return CreatedAtAction(nameof(CreateCarPriceList), result);
        }
    }
}
