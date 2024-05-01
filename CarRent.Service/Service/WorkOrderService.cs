using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Exceptions;
using CarRent.data.Models.User;
using CarRent.data.Models.Workers;
using CarRent.Repository.Extensions;
using CarRent.Repository.Interfaces;
using CarRent.Repository.Parameters;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace CarRent.Service.Service
{
    public class WorkOrderService : ServiceBase, IWorkOrderService
    {
        private readonly UserManager<User> _userManager;

        public WorkOrderService(UserManager<User> userManager, IRepositoryManager repository, IMapper mapper)
            : base(repository, mapper)
        {
            _userManager = userManager;
        }

        public async Task<WorkOrderDetailsDto> GetWorkOrderAsync(int id)
        {
            var workers = await GetWorkerListForWorkOrder(id);

            int compleatedStatusId = await _repository.WorkOrderStatus
                .FindByCondition(x => x.IsActive == true && 
                    x.IsDefaultForCompleated == true,
                    false)
                .Select(x => x.Id)
                .FirstOrDefaultAsync();

            var item = await _repository.WorkOrder
                .GetAsync(id, false)
                .Select(x => new WorkOrderDetailsDto(
                         x.Id,
                        x.Title,
                        x.Description,
                        x.CreatedData,
                        x.ScheduledDate,
                        x.CompletedDate,
                        x.WorkOrderStatusId,
                        x.WorkOrderPriorityId,
                        x.EstimatedHours,
                        x.ActualHours,
                        x.Notes,
                        x.WorkOrderStatusId != compleatedStatusId,
                        workers
                    ))
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("WorkOrder not found"); ;
            return item;
        }

        public async Task<NewWorkOrderDto> CreateWorkOrderAsync(NewWorkOrderDto workOrder)
        {
            if (workOrder.WorkerId.IsNullOrEmpty())
            {
                return await CreateWorkOrderWithoutWorkerAsync(workOrder);
            }
            else
            {
                return await CreateWorkOrderForWorkerAsync(workOrder);
            }
        }

        public async Task<WorkOrderToAssign> AssignWorkOrderAsync(WorkOrderToAssign workOrder)
        {
            if (await WorkerIsAssigned(workOrder))
            {
                throw new Exception("this workOrder is already assign to this worker");
            }

            var newWorkOrder = new WorkOrderWorker()
            {
                WorkOrderId = workOrder.WorkOrderId,
                WorkerId = workOrder.WorkerId,
                IsActive = true
            };

            _repository.WorkOrderWorker.Create(newWorkOrder);
            await _repository.SaveAsync();

            return workOrder;
        }
        public async Task RemoveWorkerFromWorkOrderAsync(WorkOrderToAssign workOrder)
        {
            var order = await _repository
                .WorkOrderWorker
                .FindByCondition(
                    x=> x.IsActive == true && 
                    x.WorkerId == workOrder.WorkerId && 
                    x.WorkOrderId == workOrder.WorkOrderId, true)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("Not found"); ;

            order.IsActive = false;
            await _repository.SaveAsync();
        }
        public async Task ChangeWorkOrderStatusAsync(StatusToChange status)
        {
            var toChange = await _repository.WorkOrder
                .GetAsync(status.WorkOrderId, true)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("WorkOrderStatus not found");

            toChange.WorkOrderStatusId = status.StatusId;
            await _repository.SaveAsync();
        }
        public async Task ChangeWorkOrderPriorityAsync(PriorityToChange priority)
        {
            var toChange = await _repository.WorkOrder
                .GetAsync(priority.WorkOrderId, true)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("WorkOrderPriority not found");

            toChange.WorkOrderStatusId = priority.PriorityId;
            await _repository.SaveAsync();
        }
        public async Task<PagedList<WorkOrderDto>> GetWorkOrderByParamsAsync(WorkOrderParameters orderParams)
        {
            var items = _repository.WorkOrder
                .FindByCondition(x => x.IsActive == true, false)
                .OrderByDescending(x=>x.CreatedData)
                .Search(_repository.Context, orderParams)
                .Select(x => new WorkOrderDto(
                    x.Id,
                    x.Title,
                    x.Description,
                    x.CreatedData,
                    x.ScheduledDate,
                    x.CompletedDate,
                    x.WorkOrderStatus.Name ?? "",
                    x.WorkOrderPriority.Name ?? "",
                    x.EstimatedHours,
                    x.ActualHours,
                    x.Notes
                    ));

            return await PagedList<WorkOrderDto>
                .ToPagedList(items, orderParams.PageNumber, orderParams.PageSize);
        }

        public async Task<DataForWorkOrderFilters> GetDataForWorkOrderFilters()
        {
            var statuses = await _repository.WorkOrderStatus.FindByCondition(x => x.IsActive, false)
                .Select(x => _mapper.Map<WorkOrderStatusDto>(x))
                .ToArrayAsync();

            var priorities = await _repository.WorkOrderPriority.FindByCondition(x => x.IsActive, false)
                .Select(x => _mapper.Map<WorkOrderPriorityDto>(x))
                .ToArrayAsync();


            var usersInRole = await _userManager
                .GetUsersInRoleAsync("Worker");


            return new DataForWorkOrderFilters(statuses, priorities,
                usersInRole
                .Where(x=>x.IsActive == true)
                .Select(x => new WorkersForWorkOrder(x.Id, $"{x.FirstName} {x.LastName}")));
        }
        
        public async Task UpdateWorkOrderAsync(int workOrderId, WorkOrderForUpdateDto workOrder)
        {
            var toUpdate = await _repository.WorkOrder
                .GetAsync(workOrderId, true)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("Not found");


            toUpdate.Title = workOrder.Title;
            toUpdate.Description = workOrder.Description;
            toUpdate.CompletedDate = workOrder.CompletedDate;
            toUpdate.WorkOrderPriorityId = workOrder.WorkOrderPriorityId;
            toUpdate.WorkOrderStatusId = workOrder.WorkOrderStatusId;
            toUpdate.ActualHours = workOrder.ActualHours ?? 0;
            toUpdate.EstimatedHours = workOrder.EstimatedHours ?? 0;
            toUpdate.Notes = workOrder.Notes;
 
            await _repository.SaveAsync();
        }

        public async Task CompleatWorkOrderAsync(int workOrderId, WorkOrderForUpdateDto workOrder)
        {
            var toUpdate = await _repository.WorkOrder
                .GetAsync(workOrderId, true)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("Not found");

            int compleatedStatusId = await _repository.WorkOrderStatus
                .FindByCondition(x => x.IsActive == true && x.IsDefaultForCompleated == true, false)
                .Select(x => x.Id)
                .FirstOrDefaultAsync();

            await Console.Out.WriteLineAsync("Statusid : " + compleatedStatusId.ToString());

            toUpdate.CompletedDate = DateTime.Now;
            toUpdate.WorkOrderStatusId = compleatedStatusId;

            await _repository.SaveAsync();
        }

        public async Task DeleteWorkOrderAsync(int workOrderId)
        {
            var toUpdate = await _repository.WorkOrder
               .GetAsync(workOrderId, true)
               .SingleOrDefaultAsync() ?? throw new DataNotFoundException("Not found");

            toUpdate.IsActive = false;
            await _repository.SaveAsync();
        }

        private async Task<bool> WorkerIsAssigned(WorkOrderToAssign workOrder)
        {
            var count = await _repository.WorkOrderWorker
                .FindByCondition(x => x.IsActive &&
                    x.WorkerId == workOrder.WorkerId &&
                    x.WorkOrderId == workOrder.WorkOrderId, false)
                .CountAsync();

            return count > 0;
        }

        private async Task<NewWorkOrderDto> CreateWorkOrderWithoutWorkerAsync(NewWorkOrderDto workOrder)
        {
            var newWorkOrder = new WorkOrder()
            {
                Title = workOrder.Title,
                Description = workOrder.Description,
                CreatedData = DateTime.Now,
                ScheduledDate = workOrder.ScheduledDate,
                WorkOrderStatusId = workOrder.WorkOrderStatusId,
                WorkOrderPriorityId = workOrder.WorkOrderPriorityId,
                EstimatedHours = workOrder.EstimatedHours,
                Notes = workOrder.Notes,
                IsActive = true
            };
            _repository.WorkOrder.Create(newWorkOrder);
            await _repository.SaveAsync();

            return workOrder;
        }

        private async Task<NewWorkOrderDto> CreateWorkOrderForWorkerAsync(NewWorkOrderDto workOrder)
        {
            var workOrderWorker = new WorkOrderWorker()
            {
                WorkerId = workOrder.WorkerId,
                IsActive = true,
                WorkOrder = new WorkOrder()
                {
                    Title = workOrder.Title,
                    Description = workOrder.Description,
                    CreatedData = DateTime.Now,
                    ScheduledDate = workOrder.ScheduledDate,
                    WorkOrderStatusId = workOrder.WorkOrderStatusId,
                    WorkOrderPriorityId = workOrder.WorkOrderPriorityId,
                    EstimatedHours = workOrder.EstimatedHours,
                    Notes = workOrder.Notes,
                    IsActive = true
                }
            };

            _repository.WorkOrderWorker.Create(workOrderWorker);
            await _repository.SaveAsync();

            return workOrder;
        }

        private async Task<IEnumerable<WorkersForWorkOrder>> GetWorkerListForWorkOrder(int workOrderId)
        {
            return await _repository.WorkOrderWorker
                .FindByCondition(
                    x => x.WorkOrderId == workOrderId &&
                    x.IsActive == true, false)
                .Select(x => new WorkersForWorkOrder(
                            x.WorkerId, 
                            $"{x.Worker.FirstName} {x.Worker.LastName}"))
                .ToListAsync();
        }
    }
}
