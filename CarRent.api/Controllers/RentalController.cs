using CarRent.data.DTO;
using CarRent.data.Models.User;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Security.Claims;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class RentalController : BaseController
    {
        private readonly UserManager<User> _userManager;
        public RentalController(IServiceManager serviceManager, 
        UserManager<User> userManager)
            : base(serviceManager)
        {
            _userManager = userManager;
        }

        [Authorize]
        [HttpPost("AddNewUserRental")]
        public async Task<IActionResult> AddRental([FromBody] object allRentalData)
        {
            var temp = JsonConvert.DeserializeObject<AllRentalDataDto>(allRentalData.ToString());
            
            if(temp == null)
            {
                return Ok(false);
            }

            var username = User.Identity.Name;
            var user = await _userManager.FindByNameAsync(username);
            
            if (user == null)
            {
                return Ok(false);
            }


            var price = await _services
                .PriceListService
                .GetPriceForCarForDate(user.Id, temp.NewRentalForClient);

            if(price == null)
            {
                return Ok(false);
            }

            var result = await _services.RentalService.CreateRentalAndInvoiceAndAssignUser
                (user.Id,
                temp.Invoice,
                temp.NewRentalForClient,
                temp.ClientDetails,
                price
                );

            return Ok(true);
        }

        [Authorize(Roles = "User")]
        [HttpPost("IsDateAvailable")]
        public async Task<IActionResult> IsDateAvailable(NewRentalForClient dates)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var username = User.Identity.Name;

            var _user = await _userManager.FindByNameAsync(username);

            await Console.Out.WriteLineAsync("id: " + userId);
            await Console.Out.WriteLineAsync("username: "+ username);
            await Console.Out.WriteLineAsync("username: "+ _user.Id);
            return Ok(true);
        }
    }
}
