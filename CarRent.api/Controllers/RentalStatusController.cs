using CarRent.data.DTO;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class RentalStatusController : BaseController
    {
        public RentalStatusController(IServiceManager serviceManager) 
            : base(serviceManager)
        {
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetRentalStatuses()
        {
            var list = await _services.RentalStatusService.GetAllAsync(false);
            return Ok(list);
        }

        [HttpGet]
        public async Task<IActionResult> GetActiveRentalStatuses()
        {
            var list = await _services.RentalStatusService.GetAllActiveAsync(false);
            return Ok(list);
        }

        [HttpGet("get/{id:int}")]
        public async Task<IActionResult> GetRentalStatusById(int id)
        {
            var status = await _services.RentalStatusService.GetAsync(id, false);
            return Ok(status);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateRentalStatus([FromBody] RentalStatusDto rentalStatus)
        {
            var createdStatus = await _services.RentalStatusService.CreateAsync(rentalStatus);
            return CreatedAtAction(nameof(CreateRentalStatus), createdStatus);
        }

        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> UpdateRentalStatus(int id, [FromBody] RentalStatusDto rentalStatus)
        {
            await _services.RentalStatusService.UpdateAsync(id, rentalStatus, trackChanges: true);
         
            return NoContent();
        }


        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteRentalStatus(int id)
        {
            await _services.RentalStatusService.DeleteAsync(id);
            return NoContent();
        }
    }
}
