using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.Company
{
    public class AboutCompany : BaseDictionaryModel
    {
        public override int Id { get; set; }
        public string NIP { get; set; } = null!;
        public string REGON { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string? Owner { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? State { get; set; }
        public string? City { get; set; }
        public string? Image { get; set; }
    }
}
