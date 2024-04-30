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

    public record ReportParamDto(
       DateTime? DateFrom,
       DateTime? DateTo
   );

    public record InvoiceParamDto(
        DateTime? CreatedDateFrom,
        DateTime? CreatedDateTo
    );

    public class ForMonthReport
    {
        public string Month { get; set; }
        public int Year { get; set; }
        public int MonthValue { get; set; }
        public decimal Amount { get; set; }
    }

    public class ForCarsReport
    {
        public int CarId {  get; set; }
        public string CarName { get; set; } = null!;
        public decimal Cost { get; set; }
        public int RentalCount { get; set; }
        public int TotalRentalDays {  get; set; }
        public double AverageRentalDays {  get; set; }
    }



    public record InvoiceForReportDto(
        int Id, 
        string Client, 
        decimal? TotalPaid, 
        decimal? TotalToPay, 
        DateTime? CreatedDate,
        DateTime? PaymentDate
    );
}
