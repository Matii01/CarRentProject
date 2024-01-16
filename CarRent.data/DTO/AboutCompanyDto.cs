using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.DTO
{
    public record AboutCompanyDto(
        string NIP,
        string REGON,
        string Name,
        string? Owner,
        string? Address,
        string? PhoneNumber,
        string? Email,
        string? State,
        string? City,
        string? Image 
    );
}
