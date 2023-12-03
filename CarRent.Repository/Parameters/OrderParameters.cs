using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Parameters
{
    public class OrderParameters : RequestParameters
    {
        public string? ClientId { get; set; }
        public DateTime? InvoiceFrom { get; set; }
        public DateTime? InvoiceTo { get; set; }
        public decimal? Price { get; set; }
        public int? Status { get; set; }
    }
}
