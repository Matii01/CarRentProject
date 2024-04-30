using CarRent.data.Models.User;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace CarRent.Service.Service
{
    public class UsersService : IUsersService
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UsersService(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<User> GetWorkerByEmail(string userEmail)
        {
            var user =  await _userManager
                .FindByEmailAsync(userEmail) ?? throw new Exception("not found");
            
            return user;
        }

        public async Task<User> GetWorkerById(string id)
        {
            var user = await _userManager.FindByIdAsync(id)
                ?? throw new Exception("not found");

            return user;
        }

        public async Task DeleteWorker(string id)
        {
            var user = await _userManager.FindByIdAsync(id)
                ?? throw new Exception("not found");

            user.IsActive = false;
            await _userManager.UpdateAsync(user);
        }

        public async Task<IList<User>> GetWorkersListAsync()
        {
            const string roleName = "Worker";
            if (!await _roleManager.RoleExistsAsync(roleName))
            {
                await Console.Out.WriteLineAsync("no role");
                throw new Exception("this role do not exist");
            }

            var usersInRole = await _userManager.GetUsersInRoleAsync(roleName);

            return usersInRole.Where(x=> x.IsActive == true).ToList();
        }

        public async Task<IList<User>> GetUsersListAsync()
        {
            const string roleName = "User";
            if (!await _roleManager.RoleExistsAsync(roleName))
            {
                await Console.Out.WriteLineAsync("no role");
                throw new Exception("this role do not exist");
            }

            var usersInRole = await _userManager.GetUsersInRoleAsync(roleName);
            
            return usersInRole.Where(x => x.IsActive == true).ToList();
        }
    }
}
