using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.DTO
{
    public record class RabatDto(int Id, decimal RabatPercentValue);
    public record class RabatValueDto(decimal RabatPercentValue);
}
