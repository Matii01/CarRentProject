using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class CarOpinionController : BaseController
    {
        public CarOpinionController(IServiceManager serviceManager) 
            : base(serviceManager)
        {

        }
    }
}
