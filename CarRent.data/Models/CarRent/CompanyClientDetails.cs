using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class CompanyClientDetails : BaseDictionaryModel
    {
        public override int Id { get; set; }
        public string NIP { get; set; } = null!;
        public string CompanyName { get; set; } = null!;
        public string StreetAndNumber { get; set; } = null!;
        public string PostCode { get; set; } = null!;
        public string City { get; set; } = null!;

    }
}
