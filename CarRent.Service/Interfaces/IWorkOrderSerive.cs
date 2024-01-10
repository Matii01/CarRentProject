using CarRent.data.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface IWorkOrderService
    {
        Task<WorkOrderDto> CreateWorkOrderAsync(WorkOrderDto workOrder);
        Task<WorkOrderToAssign> AssignWorkOrderAsync(WorkOrderToAssign workOrder);
    }
}
