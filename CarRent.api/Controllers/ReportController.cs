using CarRent.data.DTO;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Composition;
using System.IO;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class ReportController : BaseController
    {
        public ReportController(IServiceManager serviceManager) : base(serviceManager)
        {
        }

        [HttpGet("monthReport")]
        public async Task<IActionResult> GetMonthReport([FromQuery] ReportParamDto parameters)
        {
            var report = await _services.ReportService.GetMonthReport(parameters);
            return Ok(report);
        }

        [HttpGet("invoiceReport")]
        public async Task<IActionResult> GetInvoiceReport([FromQuery] InvoiceParamDto parameters)
        {
            var report = await _services.ReportService.GetInvoiceReport(parameters);
            
            return Ok(report);
        }

        [HttpGet("carsReport")]
        public async Task<IActionResult> GetCarsReport([FromQuery] ReportParamDto parameters)
        {
            var report = await _services.ReportService.GetCarsReport(parameters);
            return Ok(report);
        }

        [HttpGet("getInvoiceDocument")]
        public async Task<IActionResult> GenerateInvoice([FromQuery] InvoiceParamDto parameters)
        {
            var report = await _services.ReportService.GetInvoiceReport(parameters);

            _services.GenerateDocumentService.GenerateExcelDocument(report.ToList(), "");

            string path = @"C:\Users\msi\Desktop\file.xlsx";
            
            if (!System.IO.File.Exists(path))
            {
                return NotFound();
            }

            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                stream.CopyTo(memory);
            }
            memory.Position = 0;

            return File(memory, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", Path.GetFileName(path));
        }
    }
}
