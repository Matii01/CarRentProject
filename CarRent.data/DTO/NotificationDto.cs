using CarRent.data.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.DTO
{
    public record NotificationDto( 
        int Id,
        string? UserId,
        string? Title,
        string? Message,
        DateTime? CreatedDate,
        DateTime? ReadDate,
        bool? IsRead  
    );
}
