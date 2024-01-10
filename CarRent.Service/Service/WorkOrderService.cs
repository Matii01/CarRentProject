using AutoMapper;
using CarRent.data.DTO;
using CarRent.Repository.Interfaces;
using CarRent.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Service
{
    public class WorkOrderService : ServiceBase, IWorkOrderService
    {
        public WorkOrderService(IRepositoryManager repository, IMapper mapper) 
            : base(repository, mapper)
        {
        }

        public async Task<WorkOrderDto> CreateWorkOrderAsync(WorkOrderDto workOrder)
        {
            throw new NotImplementedException();
        }

        public async Task<WorkOrderToAssign> AssignWorkOrderAsync(WorkOrderToAssign workOrder)
        {
            throw new NotImplementedException();
        }
    }
}
