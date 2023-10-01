using CarRent.data.Repository;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    [ApiController]
    public class BaseController : ControllerBase
    {
        protected readonly CarRentContext _context;

        public BaseController(CarRentContext context)
        {
            _context = context;
        }
    }
}
