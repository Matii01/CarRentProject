using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.DTO
{
    public record CarMaintenanceDto(
        int Id, 
        int CarId, 
        string? WorkerId,
        string? Description, 
        string? Remarks,
        DateTime DateStart, 
        DateTime DateEnd, 
        decimal TotalCost
    );

    public record CarMaintenanceDatesDto(
        DateTime DateStart,
        DateTime DateEnd
    );

    public record NewCarMaintenanceDto(
       int CarId,
       string? Description,
       string? Remarks,
       DateTime DateStart,
       DateTime DateEnd,
       decimal TotalCost
    );

    public record CarMaintenanceListDto(
        int Id,
        string CarName,
        DateTime DateStart,
        DateTime DateEnd,
        decimal TotalCost
    );
}
