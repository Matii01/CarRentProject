using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class InvoiceItem : BaseDictionaryModel
    {
        [Key]
        public override int Id { get;set; }

        public int InvoiceId { get; set; }
        public Invoice Invoice { get; set; } = null!;

        [Precision(18, 2)]
        [Range(0, double.MaxValue)]
        public decimal Rabat {  get; set; }

        [Precision(18, 2)]
        [Range(0, double.MaxValue)]
        public decimal Net { get; set; }

        [Precision(18, 2)]
        [Range(0, double.MaxValue)]
        public decimal Gross { get; set; }

        [Precision(18, 2)]
        [Range(0, double.MaxValue)]
        public decimal PaidAmount { get; set; }

        [Precision(18, 2)]
        [Range(0, double.MaxValue)]
        public decimal VAT { get; set; }

        [Precision(18, 2)]
        [Range(0, double.MaxValue)]
        public decimal VATValue { get; set; }
        public int RentalId { get;set; }
        public Rental? Rental { get; set; } 
    }
}
