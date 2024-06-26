﻿using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Models.User;
using CarRent.Repository.Interfaces;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CarRent.Service.Service
{
    public class UserAddressService : ServiceBase, IUserAddressService
    {
        public UserAddressService(IRepositoryManager repository, IMapper mapper) 
            : base(repository, mapper)
        {

        }

        public async Task AddAddressFromRegisterData(string id, UserForRegistrationDto data)
        {
            var address = new AddressDto(0, data.FirstName, data.LastName, null, null, null, null, null, true);
            await AddAddressesAsync(id, address);
        }

        public async Task AddAddressesAsync(string id, AddressDto address)
        {
            UserAddress userAddress = new ()
            {
                UserAccountId = id,
                IsActive = true,
                Address = new Address
                {
                    FirstName = address.FirstName,
                    LastName = address.LastName,
                    Address1 = address.Address1,
                    Address2 = address.Address2,
                    City = address.City,
                    State = address.State,
                    Zip = address.Zip,
                    IsDefault = address.IsDefault,
                    IsActive = true
                }
            };
            
            _repository.UserAddress.Create(userAddress);
            await _repository.SaveAsync();
        }

        public async Task<IEnumerable<AddressDto>> GetAddressesAsync(string userId)
        {
            var items = await _repository.UserAddress
                .FindByCondition(x => x.UserAccountId == userId, false)
                .Select(x => _mapper.Map<AddressDto>(x.Address)).ToListAsync();

            return items;
        }

        public async Task<AddressDto?> GetDefaultAddressesAsync(string userId)
        {
            var items = await _repository.UserAddress
                .FindByCondition(x => x.UserAccountId == userId, false)
                .Select(x => _mapper.Map<AddressDto>(x.Address)).ToListAsync();

            var address = items.Where(x => x.IsDefault == true)
                .SingleOrDefault();

            return address;
        }

        public async Task UpdateAddressesAsync(int id, AddressDto address)
        {
            var items = await _repository.Address
                .FindByCondition(x=> x.Id == id, true)
                .FirstOrDefaultAsync();

            if(items != null)
            {
                items.FirstName = address.FirstName;
                items.LastName = address.LastName;
                items.Address1 = address.Address1;
                items.Address2 = address.Address2;
                items.City = address.City;
                items.State = address.State;
                items.Zip = address.Zip;
                items.IsDefault = address.IsDefault;
            }

            await _repository.SaveAsync();
        }
    }
}
