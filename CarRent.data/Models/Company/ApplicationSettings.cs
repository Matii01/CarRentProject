using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.Company
{
    public class ApplicationSettings : BaseDictionaryModel
    {
        public override int Id { get; set; }

        public bool? SendNotificationOnRentalStatusUpdate { get; set; }
        public bool? SendNotificationOnInvoiceStatusUpdate { get; set; }
        public bool? SendNotificationOnRentalCreate { get; set; }
    }
}
