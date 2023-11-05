using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.DTO
{
    public record PricelistItemDto(int Id,int Days, decimal Price);
    public record NewtPricelistItemDto(int PriceListId, int Days, decimal Price);
}
