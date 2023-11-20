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
            await Console.Out.WriteLineAsync(allRentalData.ToString());

            var temp = JsonConvert.DeserializeObject<AllRentalDataDto>(allRentalData.ToString());
            //var temp = JObject.Parse(allRentalData.ToString());
            if(temp == null)
            {
                return Ok(false);
            }
            await Console.Out.WriteLineAsync(temp.ToString());

            var user = await _authenticationService.RetrieveData(temp.Token);

            var price = _services
                .PriceListService
                .GetPriceForCar(
                    temp.NewRentalForClient.CarId,
                    temp.NewRentalForClient.DateFrom,
                    temp.NewRentalForClient.DateTo);

            await _services.RentalService
                    .CreateInvoiceAndAddRental(
                        user.UserId,
                        temp.Invoice,
                        temp.NewRentalForClient,
                        price);


            return Ok(true);
        }

        [HttpPost("IsDateAvailable")]
        public async Task<IActionResult> IsDateAvailable(RentalDates dates)
        {
            return Ok(true);
        }
    }
}
