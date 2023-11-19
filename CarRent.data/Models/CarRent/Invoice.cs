using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class Invoice : BaseModel
    {
        public int Id { get; set; }
        public int RentalId {  get; set; }
        public Rental Rental { get; set; } = null!;
        public string Number { get; set; } = null!;

        [Precision(18, 2)]
        [Range(0, double.MaxValue)]
        public decimal Net {  get; set; }

        [Precision(18, 2)]
        [Range(0, double.MaxValue)]
        public decimal Gross {  get; set; }

        [Precision(18, 2)]
        [Range(0, double.MaxValue)]
        public decimal VAT { get; set; }
        public string? Comment {  get; set; }
    }
}
