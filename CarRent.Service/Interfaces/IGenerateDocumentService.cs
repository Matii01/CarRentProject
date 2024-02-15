using CarRent.data.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface IGenerateDocumentService
    {
        //Dictionary<string, string> GenerateValueForDocument();
        string GetPathForExcelDocuments();
        string GenerateInvoiceDocxDocumentAsync(NewInvoiceDto invoiceDto, AboutCompanyDto aboutCompany);
        string GenerateExcelDocument(List<InvoiceForReportDto> rows, string filePath);
        string GenerateExcelDocument(List<ForCarsReport> rows, string filePath);
        string GenerateExcelDocument(List<ForMonthReport> rows, string filePath);
    }
}
