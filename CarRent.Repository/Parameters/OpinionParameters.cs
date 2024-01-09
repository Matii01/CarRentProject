using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Parameters
{
    public class OpinionParameters : RequestParameters
    {
        public int? CarId { get; set; }
        public string? UserId {  get; set; }
        public bool? IsAccepted { get; set; }
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
    }
}
