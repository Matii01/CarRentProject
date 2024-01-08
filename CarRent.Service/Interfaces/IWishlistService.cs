using CarRent.data.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface IWishlistService
    {
        Task<IEnumerable<WishlistDto>> GetUserWishlistAsync(string userId);
        Task<IEnumerable<WishlistForViewDto>> GetUserWishlistForViewAsync(string userId);
        Task CreateAsync(WishlistDto item, string userId);
        Task DeleteAsync(int carId, string userId);
    }
}
