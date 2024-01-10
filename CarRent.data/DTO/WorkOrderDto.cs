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
    public record WorkOrderDto(
        int Id,
        string Title,
        string? Description,
        DateTime CreatedData,
        DateTime ScheduledDate,
        DateTime CompletedDate,
        int WorkOrderStatusId,
        int WorkOrderPriorityId,
        decimal EstimatedHours,
        decimal ActualHours,
        string? Notes  
    );

    public record WorkOrderToAssign(
            int WorkOrderId,
            string WorkerId
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
}
