using CarRent.data.Models.User;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace CarRent.api.Controllers
{
    public class ControllerWithUserManager : BaseController
    {
        protected readonly UserManager<User> _userManager;
        public ControllerWithUserManager(IServiceManager serviceManager, UserManager<User> userManager) 
            : base(serviceManager)
        {
            _userManager = userManager;
        }

        protected async Task<(bool IsSuccess, string Message, User? User)> ValidateUser()
        {
            if(User?.Identity?.IsAuthenticated != true) 
            {
                return (false, "User is not authenticated", null);
            }

            var username = User?.Identity?.Name;
            if(string.IsNullOrEmpty(username))
            {
                return (false, "User name is not available.", null);
            }

            var user = await _userManager.FindByNameAsync(username);
            if(user == null)
            {
                return (false, "User not found", null); 
            }

            return (true, "User is valid", user);
        }
    }
}
