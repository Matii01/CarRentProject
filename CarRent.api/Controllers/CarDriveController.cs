using CarRent.Repository;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class CarDriveController : BaseController
    {
        public CarDriveController(CarRentContext context) : base(context)
        {
        }
    }
}
