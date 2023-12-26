using CarRent.data.DTO;
using CarRent.data.Models.User;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet("userDetails")]
        public async Task<IActionResult> GetUserDetailByUserName([FromQuery] string userName)
        {
            //var user = await _userManager.FindByLoginAsync(userName);
            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
            {
                return NotFound();

            }
            return Ok(user);
        }

        [Authorize(Roles = "User")]
        [HttpGet("GetUserAddresses")]
        public async Task<IActionResult> GetUserAddresses()
        {
            var username = User.Identity.Name;
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound();
            }

            var items = await _services.UserAddressService.GetAddressesAsync(user.Id);
            return Ok(items);
        }

        [Authorize(Roles = "User")]
        [HttpPost("AddUserAddresses")]
        public async Task<IActionResult> AddUserAddresses([FromBody] AddressDto address)
        {
            var username = User.Identity.Name;
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound();
            }

            await _services.UserAddressService.AddAddressesAsync(user.Id, address);
            return CreatedAtAction("AddUserAddresses", address);
        }

        [Authorize(Roles = "User")]
        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePassword passwords)
        {
            var username = User.Identity.Name;
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound();
            }

            if (passwords.RetypePassword != passwords.NewPassword)
            {
                return BadRequest(new { message = "New password and confirm password do not match." });
            }

            var result = await _userManager.ChangePasswordAsync(user, passwords.OldPassword, passwords.NewPassword);
            if (!result.Succeeded)
            {
                return BadRequest(new { message = "Current password is incorrect." });

            }
            return Ok(new { message = "Password changed successfully." });
        }


        [Authorize(Roles = "User")]
        [HttpPut("UpdateUserAddresses/{id:int}")]
        public async Task<IActionResult> UpdateUserAddresses(int id, [FromBody] AddressDto address)
        {
            var username = User.Identity.Name;
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound();
            }

            await _services.UserAddressService.UpdateAddressesAsync(id, address);
            return Ok(address);
        }
    }
}
