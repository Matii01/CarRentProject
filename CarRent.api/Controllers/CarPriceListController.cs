using Microsoft.AspNetCore.Mvc;
using CarRent.Service.Interfaces;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class CarPriceListController : BaseController
    {
        public CarPriceListController(IServiceManager serviceManager) 
            : base(serviceManager)
        {
        }

        [HttpPost("create/{carId:int}")]
        public async Task<IActionResult> CreateCarPriceList(int carId)
        {
            var carPriceList = await _services.PriceListService.CarPriceListExist(carId);

            if (carPriceList)
            {
                return Ok("pricelist for this car already exist");
            }


            var result = new string[] { "ok it will be created", carId.ToString() };
            return Ok(result);
        }
    }
}
