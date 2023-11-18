using CarRent.data.DTO;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class RentalController : BaseController
    {
        public RentalController(IServiceManager serviceManager)
            : base(serviceManager)
        {
        }


        [HttpPost("IsDateAvailable")]
        public async Task<IActionResult> IsDateAvailable(RentalDates dates)
        {
            return Ok(true);
        }
    }
}
