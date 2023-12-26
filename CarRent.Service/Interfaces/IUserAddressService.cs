using CarRent.data.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface IUserAddressService
    {
        Task AddAddressesAsync(string id, AddressDto address);
        Task<IEnumerable<AddressDto>> GetAddressesAsync(string userId);
        Task<AddressDto?> GetDefaultAddressesAsync(string userId);
        Task UpdateAddressesAsync(int id, AddressDto address);
    }
}
