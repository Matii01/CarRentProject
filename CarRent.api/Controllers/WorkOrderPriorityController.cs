using CarRent.data.DTO;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    public class WorkOrderPriorityController : BaseController
    {
        public WorkOrderPriorityController(IServiceManager serviceManager) 
            : base(serviceManager)
        {

        }

        [HttpGet("all")]
        public async Task<IActionResult> GetWorkOrderPriority()
        {

            var list = await _services.WorkOrderPriorityService.GetAllAsync(false);
            return Ok(list);
        }

        [HttpGet]
        public async Task<IActionResult> GetActiveWorkOrderPriority()
        {
            var list = await _services.WorkOrderPriorityService.GetAllActiveAsync(false);
            return Ok(list);
        }

        [HttpGet("get/{id:int}")]
        public async Task<IActionResult> GetWorkOrderPriorityById(int id)
        {
            var status = await _services.WorkOrderPriorityService.GetAsync(id, false);
            return Ok(status);
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("create")]
        public async Task<IActionResult> CreateWorkOrderPriority([FromBody] WorkOrderPriorityDto workOrderPriority)
        {
            var created = await _services.WorkOrderPriorityService.CreateAsync(workOrderPriority);
            return CreatedAtAction(nameof(CreateWorkOrderPriority), created);
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> UpdateWorkOrderPriority(int id, [FromBody] WorkOrderPriorityDto workOrderPriority)
        {
            await _services.WorkOrderPriorityService.UpdateAsync(id, workOrderPriority, trackChanges: true);

            return NoContent();
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteWorkOrderPriority(int id)
        {
            await _services.WorkOrderPriorityService.DeleteAsync(id);
            return NoContent();
        }
    }
}
