using CarRent.data.DTO;
using CarRent.data.Models.User;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class WorkerSidebarController : BaseController
    {
        private readonly UserManager<User> _userManager;
        public WorkerSidebarController(IServiceManager serviceManager, UserManager<User> userManager)
            : base(serviceManager)
        {
            _userManager = userManager;
        }
        
        [Authorize(Roles = "Worker")]
        [HttpGet("GetWorkerSidebar")]
        public async Task<IActionResult> GetWorkerSidebar()
        {
            var username = User.Identity.Name;
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound();
            }

            var items = await _services.WorkerSidebar.GetWorkerSidebarAsync(user.Id);
            
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
            await Console.Out.WriteLineAsync(workerId);

            foreach (var sidebar in Sidebar)
            {
                await Console.Out.WriteLineAsync(sidebar.Title);
                foreach (var item in sidebar.Children)
                {
                    await Console.Out.WriteLineAsync($"   -{item.Name}");
                }
            }

            await _services.WorkerSidebar.GenerateWorkerSidebarAsync(Sidebar, workerId);
            return Ok("");
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("EditWorkerSidebar/{workerId}")]
        public async Task<IActionResult> EditWorkerSidebar([FromBody] WorkerSidebarDto[] Sidebar, string workerId)
        {
            var items = await _services.WorkerSidebar.EditWorkerSidebarAsync(Sidebar, workerId);
            await Console.Out.WriteLineAsync("edit sidebar");
            return Ok(items);
        }
    }
}
