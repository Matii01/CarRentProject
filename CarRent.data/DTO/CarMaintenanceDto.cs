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
        string WorkerId,
        string Description, 
        DateTime DateStart, 
        DateTime DateEnd, 
        decimal TotalCost);
}
