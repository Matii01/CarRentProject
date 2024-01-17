using CarRent.data.DTO;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class AboutCompanyController : BaseController
    {
        public AboutCompanyController(IServiceManager serviceManager)
            : base(serviceManager)
        {
        }

        [HttpGet]
        public async Task<IActionResult> GetAboutCompany()
        {
            var item = await _services.AboutCompanyService.GetAboutCompany();
            return Ok(item);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public async Task<IActionResult> UpdateAboutCompany([FromBody] AboutCompanyDto item)
        {
            await _services.AboutCompanyService.UpdateAboutCompany(item);
            return Ok();
        }
    }
}
