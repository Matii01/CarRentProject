using CarRent.data.DTO;
using CarRent.Repository.Parameters;

namespace CarRent.Service.Interfaces
{
    public interface IWorkOrderService
    {
        Task<WorkOrderDetailsDto> GetWorkOrderAsync(int id);
        Task<NewWorkOrderDto> CreateWorkOrderAsync(NewWorkOrderDto workOrder);
        Task<WorkOrderToAssign> AssignWorkOrderAsync(WorkOrderToAssign workOrder);
        Task ChangeWorkOrderStatusAsync(StatusToChange status);
        Task ChangeWorkOrderPriorityAsync(PriorityToChange priority);
        Task<PagedList<WorkOrderDto>> GetWorkOrderByParamsAsync(WorkOrderParameters orderParams);
        Task<DataForWorkOrderFilters> GetDataForWorkOrderFilters();
    }
}
