﻿using CarRent.data.DTO;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class KilometrLimitController : BaseController
    {
        public KilometrLimitController(IServiceManager serviceManager)
            : base(serviceManager)
        {
        }

        [HttpGet]
        public async Task<IActionResult> GetAirConditioning()
        {
            var items = await _services.KilometrLimitService.GetAllActiveAsync(false);
            return Ok(items);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAirConditioning([FromBody] KilometrLimitDto limit)
        {
            await _services.KilometrLimitService.CreateAsync(limit);
            return Ok(limit);
        }

        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> UpdateAirConditioning(int id, [FromBody] KilometrLimitDto limit)
        {
            await _services.KilometrLimitService.UpdateAsync(id, limit, true);

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteAirConditioning(int id)
        {
            await _services.KilometrLimitService.DeleteAsync(id);
            return NoContent();
        }
    }
}