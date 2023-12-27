using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class DataForRental : BaseDictionaryModel
    {
        public override int Id { get; set ; }
        public string PaymentIntentId { get; set; } = null!;
        public string RentalData { get; set; } = null!;
    }
}
