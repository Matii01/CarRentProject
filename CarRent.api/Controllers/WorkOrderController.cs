using CarRent.data.DTO;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class WorkOrderController : BaseController
    {
        public WorkOrderController(IServiceManager serviceManager) 
            : base(serviceManager)
        {
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetRentalStatuses()
        {

            return Ok("");
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("create")]
        public async Task<IActionResult> CreateWorkOrder([FromBody] WorkOrderDto workOrder)
        {
            var created = _services.WorkOrderService.CreateWorkOrderAsync(workOrder);
            return CreatedAtAction(nameof(CreateWorkOrder), created);
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("create")]
        public async Task<IActionResult> AssignWorkOrder([FromBody] WorkOrderToAssign workOrder)
        {
            var created = _services.WorkOrderService.AssignWorkOrderAsync(workOrder);

            return CreatedAtAction(nameof(CreateWorkOrder), created);
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("create")]
        public async Task<IActionResult> ChangeWorkOrderStatus([FromBody] WorkOrderToAssign workOrder)
        {
            return Ok("");
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("create")]
        public async Task<IActionResult> ChangeWorkOrderPriority([FromBody] WorkOrderToAssign workOrder)
        {
            return Ok("");
        }
    }
}
