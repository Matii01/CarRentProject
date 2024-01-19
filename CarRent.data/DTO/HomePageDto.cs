using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.DTO
{
    public record HomePageDto(
        string? HomePageImage,
        string? HomePageTitle,
        string? HomePageTextOne,
        string? HomePageTextTwo
    );
}
