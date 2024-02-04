using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class ReportController : BaseController
    {
        public ReportController(IServiceManager serviceManager) : base(serviceManager)
        {
        }
    }
}
