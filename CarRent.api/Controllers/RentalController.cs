using CarRent.data.DTO;
using CarRent.data.Models.User;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class RentalController : BaseController
    {
        private readonly IAuthenticationService _authenticationService;
        public RentalController(IServiceManager serviceManager, IAuthenticationService authenticationService)
            : base(serviceManager)
        {
            _authenticationService = authenticationService;
        }

        //[Authorize(Roles = "User")]
        [HttpPost("AddNewUserRental")]
        public async Task<IActionResult> AddRental([FromBody] object allRentalData)
        {
            var temp = JsonConvert.DeserializeObject<AllRentalDataDto>(allRentalData.ToString());
            
            if(temp == null)
            {
                return Ok(false);
            }

            var user = await _authenticationService.RetrieveData(temp.Token);
            if(user == null)
            {
                return Ok(false);
            }

            var price = await _services
                .PriceListService
                .GetPriceForCarForDate(temp.NewRentalForClient);

            if(price == null)
            {
                return Ok(false);
            }

            var result = await _services.RentalService.CreateRentalAndInvoiceAndAssignUser
                (user.UserId,
                temp.Invoice,
                temp.NewRentalForClient,
                temp.ClientDetails,
                price
                );

            return Ok(true);
        }

        [HttpPost("IsDateAvailable")]
        public async Task<IActionResult> IsDateAvailable(NewRentalForClient dates)
        {
            return Ok(true);
        }
    }
}
