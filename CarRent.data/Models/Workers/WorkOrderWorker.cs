using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.Workers
{
    public class WorkOrderWorker : BaseDictionaryModel
    {
        public override int Id { get; set; }
        public int WorkOrderId { get; set; }
        public WorkOrder? WorkOrder { get; set; }
    
        public string? WorkerId { get; set; }
        public User.User? Worker { get; set; }
    }
}
