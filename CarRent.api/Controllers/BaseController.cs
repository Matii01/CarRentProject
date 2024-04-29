using CarRent.Repository;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BaseController : ControllerBase
    {
        protected readonly IServiceManager _services;
        public BaseController(IServiceManager serviceManager)
        {
            _services = serviceManager;
        }
    }
}
