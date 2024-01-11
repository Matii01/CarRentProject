using CarRent.data.DTO;
using CarRent.Repository.Parameters;
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

        [Authorize(Roles = "Administrator,Worker")]
        [HttpGet("all")]
        public async Task<IActionResult> GetWorksOrders([FromQuery] WorkOrderParameters param)
        {   
            var list = await _services.WorkOrderService.GetWorkOrderByParamsAsync(param);
            return Ok(list);
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetWorksOrdersById(int id)
        {
            var item = await _services.WorkOrderService.GetWorkOrderAsync(id);
            return Ok(item);
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpGet("forFilters")]
        public async Task<IActionResult> GetDataForWorkOrderFilters()
        {
            var list = await _services.WorkOrderService.GetDataForWorkOrderFilters();
            return Ok(list);
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("newWorkOrder")]
        public async Task<IActionResult> CreateWorkOrder([FromBody] NewWorkOrderDto workOrder)
        {
            var created = await _services.WorkOrderService.CreateWorkOrderAsync(workOrder);
            return CreatedAtAction(nameof(CreateWorkOrder), created);
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("create")]
        public async Task<IActionResult> AssignWorkOrder([FromBody] WorkOrderToAssign workOrder)
        {
            var created = await _services.WorkOrderService.AssignWorkOrderAsync(workOrder);

            return CreatedAtAction(nameof(CreateWorkOrder), created);
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("create")]
        public async Task<IActionResult> ChangeWorkOrderStatus([FromBody] StatusToChange status)
        {
            await _services.WorkOrderService.ChangeWorkOrderStatusAsync(status);
            return Ok("");
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("create")]
        public async Task<IActionResult> ChangeWorkOrderPriority([FromBody] PriorityToChange priority)
        {
            await _services.WorkOrderService.ChangeWorkOrderPriorityAsync(priority);
            return Ok("");
        }
    }
}
