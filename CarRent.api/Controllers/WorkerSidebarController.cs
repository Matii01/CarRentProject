using CarRent.data.DTO;
using CarRent.data.Models.User;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    public class WorkerSidebarController : BaseController
    {
        private readonly IAuthenticationService _authentication;
        public WorkerSidebarController(IServiceManager serviceManager, IAuthenticationService authentication)
            : base(serviceManager)
        {
            _authentication = authentication;
        }
        
        [Authorize(Roles = "Worker")]
        [HttpGet("GetWorkerSidebar")]
        public async Task<IActionResult> GetWorkerSidebar()
        {
            var userId = await _authentication.GetUserIdByClaims(User);

            var items = await _services.WorkerSidebar.GetWorkerSidebarAsync(userId);
            return Ok(items);
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("GetWorkerSidebarForEdit/{workerId}")]
        public async Task<IActionResult> GetWorkerSidebarForEdit(string workerId)
        {
            var items = await _services.WorkerSidebar.GetWorkerSidebarAsync(workerId);

            return Ok(items);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("GenerateWorkerSidebar/{workerId}")]
        public async Task<IActionResult> GenerateWorkerSidebar([FromBody] WorkerSidebarDto[] Sidebar, string workerId)
        {
            await _services.WorkerSidebar.GenerateWorkerSidebarAsync(Sidebar, workerId);
            return Ok("");
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("EditWorkerSidebar/{workerId}")]
        public async Task<IActionResult> EditWorkerSidebar([FromBody] WorkerSidebarDto[] Sidebar, string workerId)
        {
            var items = await _services.WorkerSidebar.EditWorkerSidebarAsync(Sidebar, workerId);
            return Ok(items);
        }
    }
}
