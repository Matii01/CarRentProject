using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace CarRent.data.Models.CarRent
{
    public class Rental : BaseDictionaryModel
    {
        [Key]
        public override int Id { get; set; }
        
        public int CarId { get; set; }
        public Car Car { get; set; } = null!;
        public int? RentalStatusId { get; set; }  
        public RentalStatus? RentalStatus { get; set; }
        public InvoiceItem InvoiceItem { get; set; } = null!;
        public DateTime RentalStart { get; set; }
        public DateTime RentalEnd { get; set; }
        public string? Remark { get; set; }

        [Precision(18, 2)]
        [Range(0, double.MaxValue)]
        public decimal TotalRentalCost { get; set; }
    }
}
