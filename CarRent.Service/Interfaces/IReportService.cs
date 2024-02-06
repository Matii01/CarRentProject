using CarRent.data.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface IReportService
    {
        Task<IEnumerable<ForMonthReport>> GetMonthReport(ReportParamDto parameters);
        Task<IEnumerable<InvoiceForReportDto>> GetInvoiceReport(InvoiceParamDto parameters);
    }
}
