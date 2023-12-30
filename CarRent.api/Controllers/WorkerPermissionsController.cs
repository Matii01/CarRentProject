using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    [Authorize(Roles = "Administrator")]
    [Route("[controller]")]
    public class WorkerPermissionsController : BaseController
    {
        public WorkerPermissionsController(IServiceManager serviceManager)
            : base(serviceManager)
        {

        }
    }
}
