using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace CarRent.data.Models.CarRent
{
    public class Invoice : BaseDictionaryModel
    {
        public override int Id { get; set; }
        public string Number { get; set; } = null!;
        public string? Comment {  get; set; }
        public string? PaymentIntentId {  get; set; }
        public int ClientId { get; set; }
        public int? InvoiceStatus { get; set; }

        [Precision(18, 2)]
        [Range(0, int.MaxValue)]
        public decimal? TotalToPay { get; set; }

        [Precision(18, 2)]
        [Range(0, int.MaxValue)]
        public decimal? TotalPaid {  get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? PaymentDate {  get; set; }
        public bool? IsEditable { get; set; }
        public Client Client { get; set; } = null!;
        public ICollection<InvoiceItem> InvoicesItems { get; set;} = new List<InvoiceItem>();
    }
}
