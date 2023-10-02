using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.DTO
{
    public record CarMakeDto(int Id , string Name, string? Description);
    public record CarTypeDto(int Id, string Name);
}
