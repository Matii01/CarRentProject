﻿using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("{carId:int}/PriceList")]
        public async Task<IActionResult> GetPriceListsForCar(int carId)
        {
            var result = await _services.PriceListService
                .GetPriceListsForCar(carId, false);

            if (result.IsNullOrEmpty())
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet("{priceListId:int}/PricelistDate")]
        public async Task<IActionResult> GetPriceListsDate(int priceListId)
        {
            var result = await _services.PriceListService
                .GetPricelistDate(priceListId);

            if (result.IsNullOrEmpty())
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet("{priceListId:int}/pricelistItems")]
        public async Task<IActionResult> GetPriceListsItems(int priceListId)
        {
            var result = await _services.PriceListService
                .GetPricelistItems(priceListId);

            if (result.IsNullOrEmpty())
            {
                return NotFound();
            }

            return Ok(result);
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
    }
}
