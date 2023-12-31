using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.DTO
{
    public record WorkerSidebarDto(
           string Title, 
           string Icon,
           bool IsActive,
           IEnumerable<WorkerSidebarItemDto> Children
    );  

    public record WorkerSidebarItemDto(
           string Name,
           string Path,
           bool IsActive
    );
}
