using CarRent.data.Models.User;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class UsersController : BaseController
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        public UsersController(
            IServiceManager serviceManager, 
            UserManager<User> userManager, 
            RoleManager<IdentityRole> roleManager) 
            : base(serviceManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        //[Route("all/{roleName:string}")]
        [HttpGet("all")]
        public async Task<IActionResult> GetUsersList([FromQuery] string roleName)
        {
            
            if (!await _roleManager.RoleExistsAsync(roleName))
            {
                await Console.Out.WriteLineAsync("no role");
                return BadRequest("this role do not exist");
            }

            var usersInRole = await _userManager.GetUsersInRoleAsync(roleName);

            foreach (var user in usersInRole)
            {
                await Console.Out.WriteLineAsync(user.UserName);
            }

            if (usersInRole == null || !usersInRole.Any())
            {
                await Console.Out.WriteLineAsync("not found");
                return NotFound();
            }
            return Ok(usersInRole);
            //throw new NotImplementedException();
        }
    }
}
