using CarRent.data.DTO;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class ApplicationSettingsController : BaseController
    {
        public ApplicationSettingsController(IServiceManager serviceManager) 
            : base(serviceManager)
        {
        }

        [HttpGet]
        public async Task<IActionResult> GetApplicationSettings()
        {
            var item = await _services.ApplicationSettingsService.GetApplicationSettings();
            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateApplicationSettings([FromBody] ApplicationSettingsDto item)
        {
            await _services.ApplicationSettingsService.UpdateApplicationSettings(item);
            return Ok();
        }
    }
}
