using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class Invoice : BaseDictionaryModel
    {
        public override int Id { get; set; }
        public string Number { get; set; } = null!;
        public string? Comment {  get; set; }
        //public ICollection<InvoiceItem> invoices { get; set; } 
        public string? PaymentIntentId {  get; set; }
        public int ClientId { get; set; }
        public int? InvoiceStatus { get; set; }
        public Client Client { get; set; } = null!;
        public ICollection<InvoiceItem> InvoicesItems { get; set;} 
    }
}
