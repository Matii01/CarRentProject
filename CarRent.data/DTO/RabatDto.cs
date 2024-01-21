using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.DTO
{
    public record class RabatDto(int Id, decimal RabatPercentValue);
    public record class RabatValueDto(decimal RabatPercentValue);
    public record CarRabatDto(int Id, decimal RabatPercentValue, DateTime DateFrom, DateTime DateTo);
    public record NewRabatForUserDto(string? UserId, string? Title, decimal RabatPercentValue, DateTime? DateOfExpiration);
    public record RabatForUserDto(int Id, string? UserId, string? Title, decimal RabatPercentValue, bool IsUsed, DateTime? DateOfExpiration);
}