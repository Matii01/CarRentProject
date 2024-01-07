using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Parameters
{
    public class MaintenanceParameters : RequestParameters
    {
        public int? CarId { get; set; }
        public DateTime? MaintenanceStart { get; set; }
        public DateTime? MaintenanceEnd { get; set; }
        public bool? OnlyFutured { get; set;}
    }
}
