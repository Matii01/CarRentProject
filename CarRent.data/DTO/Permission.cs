using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.DTO
{
    public record PermissionDto(
        string WorkerId,
        string Permission
    );
}
