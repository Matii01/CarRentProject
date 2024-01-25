using CarRent.data.Models.Workers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.DTO
{
    public record NewWorkOrderDto(
        string Title,
        string? WorkerId,
        string? Description,
        DateTime? ScheduledDate,
        int WorkOrderStatusId,
        int WorkOrderPriorityId,
        decimal EstimatedHours,
        string? Notes  
    );

    public record WorkOrderDto(
        int Id,
        string Title,
        string? Description,
        DateTime CreatedData,
        DateTime? ScheduledDate,
        DateTime? CompletedDate,
        string? WorkOrderStatus,
        string? WorkOrderPriority,
        decimal? EstimatedHours,
        decimal? ActualHours,
        string? Notes
    );

    public record WorkOrderForUpdateDto(
        int Id,
        string Title,
        string? Description,
        DateTime CreatedData,
        DateTime? ScheduledDate,
        DateTime? CompletedDate,
        int WorkOrderStatusId,
        int WorkOrderPriorityId,
        decimal? EstimatedHours,
        decimal? ActualHours,
        string? Notes
    );

    public record WorkOrderDetailsDto(
        int Id,
        string Title,
        string? Description,
        DateTime CreatedData,
        DateTime? ScheduledDate,
        DateTime? CompletedDate,
        int WorkOrderStatusId,
        int WorkOrderPriorityId,
        decimal? EstimatedHours,
        decimal? ActualHours,
        string? Notes,
        bool? IsEditable,
        IEnumerable<WorkersForWorkOrder> Workers
    );

    public record WorkOrderToAssign(
            int WorkOrderId,
            string WorkerId
    );

    public record PriorityToChange(
            int WorkOrderId,
            int PriorityId
    );

    public record StatusToChange(
            int WorkOrderId,
            int StatusId
    );

    public record WorkOrderStatusDto( 
        int Id ,
        string Name,
        string? Description 
    );

    public record WorkOrderPriorityDto(
        int Id,
        string Name,
        string? Description
    );

    public record WorkersForWorkOrder(
        string WorkerId,
        string Name
    );

    public record DataForWorkOrderFilters(
        IEnumerable<WorkOrderStatusDto> Statuses,
        IEnumerable<WorkOrderPriorityDto> Priorities,
        IEnumerable<WorkersForWorkOrder> Worker
    );
}
