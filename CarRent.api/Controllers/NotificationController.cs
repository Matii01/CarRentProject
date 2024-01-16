using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class NotificationController : BaseController
    {
        public NotificationController(IServiceManager serviceManager)
            : base(serviceManager)
        {
        }

        

    }
}
