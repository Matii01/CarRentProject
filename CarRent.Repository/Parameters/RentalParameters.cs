using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Parameters
{
    public class RentalParameters : RequestParameters
    {
        public string? ClientId { get; set; }
        public int? RentalStatusId { get; set; }
        public int? CarId { get; set; }
        public DateTime? RentalStart { get; set; }
        public DateTime? RentalEnd { get; set; }
    }
}
