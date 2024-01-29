using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.DTO
{
    public record CarImageDto(int Id, int CarId, string? ImgUrl);
}
