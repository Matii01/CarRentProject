using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.DTO
{
    public record WorkOrderDto();

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
