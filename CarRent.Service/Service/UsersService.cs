using CarRent.data.Models.User;
using CarRent.Repository.Parameters;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        public async Task<IList<User>> GetWorkersListAsync()
        {
            const string roleName = "Worker";
            if (!await _roleManager.RoleExistsAsync(roleName))
            {
                await Console.Out.WriteLineAsync("no role");
                throw new Exception("this role do not exist");
            }

            var usersInRole = await _userManager.GetUsersInRoleAsync(roleName);

            return usersInRole;
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

            //var pagedList = new PagedList<User>

            return usersInRole;
        }
    }
}
