using CarRent.data.DTO;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    public class WorkOrderStatusController : BaseController
    {
        public WorkOrderStatusController(IServiceManager serviceManager) : base(serviceManager)
        {
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetWorkOrderStatuses()
        {

            var list = await _services.WorkOrderStatusService.GetAllAsync(false);
            return Ok(list);
        }

        [HttpGet]
        public async Task<IActionResult> GetActiveWorkOrderStatuses()
        {
            var list = await _services.WorkOrderStatusService.GetAllActiveAsync(false);
            return Ok(list);
        }

        [HttpGet("get/{id:int}")]
        public async Task<IActionResult> GeWorkOrderStatusById(int id)
        {
            var status = await _services.WorkOrderStatusService.GetAsync(id, false);
            return Ok(status);
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("create")]
        public async Task<IActionResult> CreateWorkOrderStatus([FromBody] WorkOrderStatusDto workOrderStatus)
        {
            var createdStatus = await _services.WorkOrderStatusService.CreateAsync(workOrderStatus);
            return CreatedAtAction(nameof(CreateWorkOrderStatus), createdStatus);
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> UpdateWorkOrderStatus(int id, [FromBody] WorkOrderStatusDto workOrderStatus)
        {
            await _services.WorkOrderStatusService.UpdateAsync(id, workOrderStatus, trackChanges: true);

            return NoContent();
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteWorkOrderStatus(int id)
        {
            await _services.WorkOrderStatusService.DeleteAsync(id);
            return NoContent();
        }
    }
}
