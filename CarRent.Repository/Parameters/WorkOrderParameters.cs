using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Parameters
{
    public class WorkOrderParameters : RequestParameters
    {
        public string? WorkerId { get; set; }
        public int? WorkOrderPriority { get; set; }
        public int? WorkOrderStatus { get; set; }
        public DateTime? CreatedDataStart { get; set; }
        public DateTime? CreatedDataEnd { get; set; }
        public DateTime? ScheduledDateStart { get; set; }
        public DateTime? ScheduledDateEnd { get; set; }
        public DateTime? CompletedDateStart { get; set; }
        public DateTime? CompletedDateEnd { get; set; }
        public decimal? EstimatedHoursMin { get; set; }
        public decimal? EstimatedHoursMax { get; set; }
        public decimal? ActualHoursMin { get; set; }
        public decimal? ActualHoursMax { get; set; }
    }
}
