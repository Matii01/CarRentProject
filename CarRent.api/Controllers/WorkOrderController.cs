using CarRent.data.DTO;
using CarRent.data.Models.User;
using CarRent.Repository.Parameters;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class WorkOrderController : BaseController
    {
        private readonly UserManager<User> _userManager;

        public WorkOrderController(UserManager<User> userManager, IServiceManager serviceManager) 
            : base(serviceManager)
        {
            _userManager = userManager;
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("all")]
        public async Task<IActionResult> GetWorksOrders([FromQuery] WorkOrderParameters param)
        {   
            var list = await _services.WorkOrderService.GetWorkOrderByParamsAsync(param);
            return Ok(list);
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpGet("workerAll")]
        public async Task<IActionResult> GetWorksOrdersForWorker([FromQuery] WorkOrderParameters param)
        {
            var username = User.Identity.Name;
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound();
            }

            param.WorkerId = user.Id;

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
        [HttpPost("assignWorkOrder")]
        public async Task<IActionResult> AssignWorkOrder([FromBody] WorkOrderToAssign workOrder)
        {
            var created = await _services.WorkOrderService.AssignWorkOrderAsync(workOrder);

            return CreatedAtAction(nameof(CreateWorkOrder), created);
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("changeWorkOrderStatus")]
        public async Task<IActionResult> ChangeWorkOrderStatus([FromBody] StatusToChange status)
        {
            await _services.WorkOrderService.ChangeWorkOrderStatusAsync(status);
            return Ok("");
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("changeWorkOrderPriority")]
        public async Task<IActionResult> ChangeWorkOrderPriority([FromBody] PriorityToChange priority)
        {
            await _services.WorkOrderService.ChangeWorkOrderPriorityAsync(priority);
            return Ok("");
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPut("update/{workOrderId:int}")]
        public async Task<IActionResult> UpdateWorkOrder(int workOrderId, [FromBody] WorkOrderForUpdateDto workOrder)
        {
            //TODO check if editing is possible
            await _services.WorkOrderService.UpdateWorkOrderAsync(workOrderId, workOrder);
            return Ok("");
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("compleat/{workOrderId:int}")]
        public async Task<IActionResult> CompleatWorkOrder(int workOrderId, [FromBody] WorkOrderForUpdateDto workOrder)
        {
            await _services.WorkOrderService.CompleatWorkOrderAsync(workOrderId, workOrder);
            return Ok("");
        }


        [Authorize(Roles = "Administrator,Worker")]
        [HttpPut("TestUpdate/{workOrderId:int}")]
        public async Task<IActionResult> TestUpdate(int workOrderId, [FromBody] WorkOrderForUpdateDto data)
        {
            await Console.Out.WriteLineAsync("asdsadasdas: "+workOrderId);
            await Console.Out.WriteLineAsync(data.ToString());
            return Ok("");
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("removeFormWorkOrder")]
        public async Task<IActionResult> RemoveWorkerFromWorkOrder([FromBody] WorkOrderToAssign workOrder)
        {
            await _services.WorkOrderService.RemoveWorkerFromWorkOrderAsync(workOrder);
            return NoContent();
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpDelete("delete/${workOrderId}")]
        public async Task<IActionResult> DeleteWorkOrder(int workOrderId)
        {
            await _services.WorkOrderService.DeleteWorkOrderAsync(workOrderId);
            return NoContent();
        }
    }
}
