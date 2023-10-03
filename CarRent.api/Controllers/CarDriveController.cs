using CarRent.Repository;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class CarDriveController : BaseController
    {
        public CarDriveController(IServiceManager service) : base(service)
        {
        }
    }
}
