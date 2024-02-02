using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.DTO
{
   
    public record CarEquipmentDto(
        int Id,
        string Name,
        string? Description 
    );

    public record CarEquipmentForFiltersDto(
        int Id,
        string Name
    );

    public record CarEquipmentForCarDto(
        int Id, 
        int CarId,
        int EquipmentId,  
        string Name, 
        string? Description
    );

    public record CarEquipmentCarDto(
        int CarId,
        int EquipmentId
    );
}
