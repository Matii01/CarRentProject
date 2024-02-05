using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.DTO
{
    //public record InvoiceParamDto(
    //    DateTime? CreatedDateFrom,
    //    DateTime? CreatedDateTo,
    //    DateTime? PaymentDateFrom,
    //    DateTime? PaymentDateTo,
    //    decimal? Min,
    //    decimal? Max,
    //    int? StatusId
    //);
    public record InvoiceParamDto(
        DateTime? CreatedDateFrom,
        DateTime? CreatedDateTo
    );

    public record InvoiceForReportDto(
        int Id, 
        string Client, 
        decimal? TotalPaid, 
        decimal? TotalToPay, 
        DateTime? CreatedDate,
        DateTime? PaymentDate
    );
}
