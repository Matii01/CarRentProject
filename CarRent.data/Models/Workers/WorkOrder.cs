using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.Workers
{
    public class WorkOrder : BaseDictionaryModel
    {
        public override int Id { get ; set ; }
        public string Title { get; set; } = null!;
        public string? Description { get; set ; }
        public DateTime CreatedData {  get; set; }
        public DateTime? ScheduledDate {  get; set; }
        public DateTime? CompletedDate {  get; set; }
        public int WorkOrderStatusId { get; set; }
        public WorkOrderStatus? WorkOrderStatus { get; set; }
        public int WorkOrderPriorityId { get; set; }
        public WorkOrderPriority? WorkOrderPriority { get; set; }

        [Precision(18, 2)]
        [Range(0, double.MaxValue)]
        public decimal EstimatedHours { get; set; }

        [Precision(18, 2)]
        [Range(0, double.MaxValue)]
        public decimal ActualHours  { get; set; }
        public string? Notes { get; set; }
    }
}
