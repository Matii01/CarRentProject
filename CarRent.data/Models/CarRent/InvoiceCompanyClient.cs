using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class InvoiceCompanyClient : BaseDictionaryModel
    {
        public override int Id { get; set; }

        public int InvoiceId { get; set; }
        public Invoice Invoice { get; set; } = null!;
        public int CompanyClientDetailsId { get; set; }
        public CompanyClientDetails CompanyClientDetails { get; set; } = null!;
    }
}
