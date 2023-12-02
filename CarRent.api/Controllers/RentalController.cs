using CarRent.data.DTO;
using CarRent.data.Models.User;
using CarRent.Repository;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Security.Claims;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class RentalController : BaseController
    {
        private readonly UserManager<User> _userManager;
        private readonly CarRentContext _db;
        public RentalController(IServiceManager serviceManager, CarRentContext db,
        UserManager<User> userManager)
            : base(serviceManager)
        {
            _userManager = userManager;
            _db = db;
        }

        [Authorize(Roles = "User")]
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

            var result = await _services.RentalService.CreateRentalAndInvoiceAndAssignUser
                (user.Id,
                temp.Invoice,
                temp.NewRentalForClient,
                temp.ClientDetails
                );

            return Ok(true);
        }

       
        [HttpPost("IsDateAvailable")]
        public async Task<IActionResult> IsDateAvailable([FromBody] NewRentalForClient dates)
        {
            //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            //var username = User.Identity.Name;
            //var _user = await _userManager.FindByNameAsync(username);
            //await Console.Out.WriteLineAsync("id: " + userId);
            //await Console.Out.WriteLineAsync("username: "+ username);
            //await Console.Out.WriteLineAsync("username: "+ _user.Id);

            await Console.Out.WriteLineAsync("carId = ==="+dates.CarId);
            if (dates.CarId == 0)
            {
                return NotFound();
            }

            await Console.Out.WriteLineAsync("data: " + dates);

            var isAvailable = await _services.RentalService.IsAvailable(dates);
            return Ok(isAvailable);
        }

        [Authorize(Roles = "User")]
        [HttpPost("AddNewUserRentalTest")]
        public async Task<IActionResult> AddRentalTest([FromBody] object allRentalData)
        {
            var temp = JsonConvert.DeserializeObject<AllRentalDataDto>(allRentalData.ToString());
            await Console.Out.WriteLineAsync(temp.ToString());
            await Console.Out.WriteLineAsync("asdasdasd");
            return Ok(true);
        }
    }
}
