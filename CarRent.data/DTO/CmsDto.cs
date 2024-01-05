using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.DTO
{
    public record ContactPageDto(
        string? PageTitle,
        string? PageDescription,
        string? AddressTitle,
        string? AddressIcon,
        string? AddressDetails,
        string? PhoneTitle,
        string? PhoneIcon,
        string? PhoneDetails,
        string? PhoneNumber,
        string? EmailTitle,
        string? EmailIcon,
        string? EmailAddress,
        string? ContactSectionTitle,
        string? TextRowOne,
        string? TextRowTwo
    );
}
