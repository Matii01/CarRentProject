using CarRent.data.DTO;
using CarRent.data.Models.User;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
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

        [Authorize(Roles = "Administrator,UserViewer")]
        [HttpGet("allUsers")]
        public async Task<IActionResult> GetUsersList()
        {
            var users = await _services.UsersService.GetUsersListAsync();

            if (users == null || !users.Any())
            {
                return NotFound();
            }
            return Ok(users);
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("allWorkers")]
        public async Task<IActionResult> GetWorkersList()
        {
            var workers = await _services.UsersService.GetWorkersListAsync();
            if (workers == null || !workers.Any())
            {
                return NotFound();
            }
            return Ok(workers);
        }

        [HttpGet("userDetails")]
        public async Task<IActionResult> GetUserDetailByUserName([FromQuery] string userName)
        {
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
            var username = User?.Identity?.Name ?? throw new Exception("");
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound();
            }

            var items = await _services.UserAddressService.GetAddressesAsync(user.Id);
            return Ok(items);
        }

        [Authorize(Roles = "User")]
        [HttpGet("GetDefaultDataForRental")]
        public async Task<IActionResult> GetDefaultDataForRental()
        {
            var username = User?.Identity?.Name ?? throw new Exception("");
            var user = await _userManager.FindByNameAsync(username);
            
            if (user is null) {
                return NotFound();
            }

            var item = await _services.UserAddressService.GetDefaultAddressesAsync(user.Id);
            
            if(item is null) {
                return NotFound();
            }

            var defaultDate = new DefaultRentalData
            {
                FirstName = item.FirstName,
                LastName = item.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Address = $"{item.Address1}, nr: {item.Address2}",
                PostCode = item.Zip,
                City = item.City,
            };

            return Ok(defaultDate);
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

        [Authorize]
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

        [Authorize(Roles = "Administrator")]
        [HttpPost("AddPermission")]
        public async Task<IActionResult> AddPermission([FromBody] PermissionDto permission)
        {
            var user = await _userManager.FindByIdAsync(permission.WorkerId);
            if (user == null)
            {
                return NotFound();
            }

            await _userManager.AddToRoleAsync(user, permission.Permission);
            var role = await _userManager.GetRolesAsync(user);

            return Ok(role);
        }

        
        [Authorize(Roles = "Administrator")]
        [HttpPost("RemovePermission")]
        public async Task<IActionResult> RemovePermission([FromBody] PermissionDto permission)
        {
            var user = await _userManager.FindByIdAsync(permission.WorkerId);
            if (user == null)
            {
                return NotFound();
            }

            await _userManager.RemoveFromRoleAsync(user, permission.Permission);
            var role = await _userManager.GetRolesAsync(user);

            return Ok(role);
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("GetWorkerPermissions/{userId}")]
        public async Task<IActionResult> GetWorkerPermissions(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            
            }

            var role = await _userManager.GetRolesAsync(user);

            return Ok(role);
        }

        [Authorize(Roles = "User")]
        [HttpGet("UserPersonalDetails")]
        public async Task<IActionResult> GetUserPersonalDetails()
        {
            var username = User.Identity.Name;
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound();
            }

            UserPersonalDataDto useData = new (
                user.FirstName,
                user.LastName,
                username,
                user.Email,
                user.PhoneNumber
            );
                
            return Ok(useData);
        }

        [Authorize(Roles = "User")]
        [HttpPost("UpdatePersonalDetails")]
        public async Task<IActionResult> UpdateUserPersonalDetails(UserPersonalDataDto updated)
        {
            var username = User.Identity.Name;
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound();
            }
            
            user.FirstName = updated.FirstName ?? user.FirstName;
            user.LastName = updated.LastName ?? user.LastName;
            user.PhoneNumber = updated.PhoneNumber ?? user.PhoneNumber;
           
            await _userManager.UpdateAsync(user);

            return Ok(updated);
        }

        [Authorize(Roles = "Administrator")]
        [HttpDelete("deleteWorker/{workerId}")]
        public async Task<IActionResult> DeleteUser(string workerId)
        {
            await _services.UsersService.DeleteWorker(workerId);

            return Ok("");
        }

    }
}
