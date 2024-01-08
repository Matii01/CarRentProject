using CarRent.data.DTO;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class InvoiceStatusController : BaseController
    {
        public InvoiceStatusController(IServiceManager serviceManager) 
            : base(serviceManager)
        {
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetRentalStatuses()
        {

            var list = await _services.InvoiceStatusService.GetAllAsync(false);
            return Ok(list);
        }

        [HttpGet]
        public async Task<IActionResult> GetActiveRentalStatuses()
        {
            var list = await _services.InvoiceStatusService.GetAllActiveAsync(false);
            return Ok(list);
        }

        [HttpGet("get/{id:int}")]
        public async Task<IActionResult> GetRentalStatusById(int id)
        {
            var status = await _services.InvoiceStatusService.GetAsync(id, false);
            return Ok(status);
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("create")]
        public async Task<IActionResult> CreateRentalStatus([FromBody] InvoiceStatusDto rentalStatus)
        {
            var createdStatus = await _services.InvoiceStatusService.CreateAsync(rentalStatus);
            return CreatedAtAction(nameof(CreateRentalStatus), createdStatus);
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> UpdateRentalStatus(int id, [FromBody] InvoiceStatusDto rentalStatus)
        {
            await _services.InvoiceStatusService.UpdateAsync(id, rentalStatus, trackChanges: true);

            return NoContent();
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteRentalStatus(int id)
        {
            await _services.InvoiceStatusService.DeleteAsync(id);
            return NoContent();
        }

    }
}
