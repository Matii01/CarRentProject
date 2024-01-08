using CarRent.data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.DTO
{
    public record WishlistDto(
         int Id ,
         int CarId ,
         string? UserId  
    );
    
    public record WishlistForViewDto(
        int Id,
        int CarId,
        string? UserId,
        CarForWishlistDto? Car
    );
}
