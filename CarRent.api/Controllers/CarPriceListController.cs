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

        [HttpGet("{carId:int}/carPricelist")]
        public async Task<IActionResult> GetCarPriceListsForClient(int carId)
        {
            var result = await _services.PriceListService
                .GetCarPricelistForClient(carId);

            return Ok(result);
        }

        [HttpGet("{carId:int}/PriceList")]
        public async Task<IActionResult> GetPriceListsForCar(int carId)
        {
            var result = await _services.PriceListService
                .GetPriceListsForCar(carId, false);

            return Ok(result);
        }

        [HttpGet("{priceListId:int}/PricelistDate")]
        public async Task<IActionResult> GetPriceListsDate(int priceListId)
        {
            var result = await _services.PriceListService
                .GetPricelistDate(priceListId);

            return Ok(result);
        }

        [HttpGet("{priceListId:int}/pricelistItems")]
        public async Task<IActionResult> GetPriceListsItems(int priceListId)
        {
            var result = await _services.PriceListService
                .GetPricelistItems(priceListId);

            //if (result.IsNullOrEmpty())
            //{
            //    return NotFound();
            //}

            return Ok(result);
        }

        [HttpGet("{priceListId:int}/CheckPrices")]
        public async Task<IActionResult> GetPriceForCarForDate(NewRentalForClient newRental)
        {
            var result = await _services.PriceListService
                .GetPriceForCarForDate(null, newRental);

            return Ok(result);
        }

        [HttpPost("defaultPriceList/{id:int}")]
        public async Task<IActionResult> ChangeDefaultPriceList(int id)
        {
            await _services.PriceListService.ChangeDefaultPriceList(id);
            return Ok("");
        }

        [HttpPost("addItem")]
        public async Task<IActionResult> AddItemToPricelist(NewtPricelistItemDto newItem)
        {
            var result = await _services.PriceListService
                .AddPosition(newItem);


            return Ok(result);
        }

        [HttpPost("addDate")]
        public async Task<IActionResult> AddPricelistDate(PricelistDateDto pricelistDate)
        {
            if (await _services.PriceListService.CarPriceListExistForThisDateTime(pricelistDate))
            {
                return BadRequest("This date range exist for this pricelist");
            }

            await _services.PriceListService.AddCarlistDate(pricelistDate);
            return CreatedAtAction(nameof(AddPricelistDate), pricelistDate);
        }

        [HttpPost("create/{carId:int}")]
        public async Task<IActionResult> CreateCarPriceList(PriceListDto priceList)
        {

            var result = await _services.PriceListService
                .CreatePriceListForCarAsync(priceList);

            return Ok(result);
        }


        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> UpdatePricelist(PriceListDto priceList)
        {
            var result = await _services.PriceListService
                .UpdatePriceListAsync(priceList);
            
            return Ok(result);
        }

        [HttpPut("updatePricelistItem/{id:int}")]
        public async Task<IActionResult> UpdatePricelistItem(int id, [FromBody] PricelistItemDto priceList)
        {
             await _services.PriceListService
                .UpdatePriceListItem(id, priceList);

            return Ok();
        }

        //[HttpPut("updatePricelistDate/{id:int}")]
        //public async Task<IActionResult> UpdatePricelistDate(int id, [FromBody] PricelistItemDto priceList)
        //{

        //    return Ok();
        //}


        [HttpPost("priceForDates/{carId:int}")]
        public async Task<IActionResult> CalculatePrice ([FromBody] NewRentalForClient rental)
        {
            //var result = await _services.PriceListService.GetPriceForCarForDate(rental);
            //return Ok(result);
            throw new NotImplementedException();
        }

        [HttpDelete("deletePricelist/{id:int}")]
        public async Task<IActionResult> DeletePriceList(int id)
        {
            await _services.PriceListService.DeletePriceList(id);
            return Ok("");
        }

        [HttpDelete("deletePricelistDate/{id:int}")]
        public async Task<IActionResult> DeletePricelistDate(int id)
        {
            await _services.PriceListService.RemovePriceListDate(id);
            return NoContent();
        }

        [HttpDelete("deletePricelistItem/{id:int}")]
        public async Task<IActionResult> DeletePricelistItem(int id)
        {
            await _services.PriceListService.RemovePosition(id);
            return NoContent();
        }
    }
}
