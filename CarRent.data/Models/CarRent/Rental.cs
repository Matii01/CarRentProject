using CarRent.data.Models.User;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        public InvoiceItem? InvoiceItem { get; set; } 
        public DateTime RentalStart { get; set; }
        public DateTime RentalEnd { get; set; }
        public string? Remark { get; set; }

        [Precision(18, 2)]
        [Range(0, double.MaxValue)]
        public decimal TotalRentalCost { get; set; }
    }
}
