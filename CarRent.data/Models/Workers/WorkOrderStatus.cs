using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.Workers
{
    public class WorkOrderStatus : BaseDictionaryModel
    {
        public override int Id { get ; set ; }
        public string Name { get; set; } = null!;
        public string? Description  { get; set; } = null!;
        
    }
}
