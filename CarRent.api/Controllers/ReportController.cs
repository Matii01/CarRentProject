using CarRent.data.DTO;
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

        [HttpGet("invoiceReport")]
        public async Task<IActionResult> GetInvoiceReport([FromQuery] InvoiceParamDto parameters)
        {
            await Console.Out.WriteLineAsync("data");
            await Console.Out.WriteLineAsync(parameters.ToString());
            
            var report = await _services.ReportService.GetInvoiceReport(parameters);
            return Ok(report);
        }
    }
}
