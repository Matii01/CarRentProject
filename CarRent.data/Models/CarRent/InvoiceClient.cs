using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class InvoiceClient : BaseDictionaryModel
    { 
        public override int Id { get; set; }
        public int InvoiceId { get; set; }
        public Invoice Invoice { get; set; } = null!;
        public int ClientDetailsId { get; set; }
        public ClientDetails ClientDetails { get; set; } = null!;
    }
}
