using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class UserInvoice : BaseDictionaryModel
    {
        public override int Id { get; set; }
        public int InvoiceId { get; set; }
        public Invoice Invoice { get; set; } = null!;
        public string? UserAccountId { get; set; }
        public User.User User { get; set; } = null!;
    }
}
