using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Models;
using CarRent.data.Models.User;
using CarRent.Repository.Interfaces;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Service
{
    public class WishlistService : ServiceBase, IWishlistService
    {
        public WishlistService(IRepositoryManager repository, IMapper mapper) 
            : base(repository, mapper)
        {
        }

        public async Task<IEnumerable<WishlistDto>> GetUserWishlistAsync(string userId)
        {
            var items = await _repository.Wishlist
                .FindByCondition(x=> x.UserId == userId && x.IsActive == true, false)
                .Select(x => new WishlistDto(x.Id, x.CarId, x.UserId))
                .ToListAsync();

            return items;
        }

        public async Task<IEnumerable<WishlistForViewDto>> GetUserWishlistForViewAsync(string userId)
        {
            var items = await _repository.Wishlist
                .FindByCondition(x => x.UserId == userId && x.IsActive == true, false)
                .Include(x=> x.Car)
                .Select(x => new WishlistForViewDto(
                    x.Id, 
                    x.CarId, 
                    x.UserId,
                    new CarForWishlistDto(x.Car.Id, x.Car.Name, x.Car.CarImage)
                    ))
                .ToListAsync();

            return items;
        }

        public async Task CreateAsync(WishlistDto item, string userId)
        {
            var element = await _repository.Wishlist
                .FindByCondition(
                    x => x.UserId == userId && 
                    x.CarId == item.CarId, true)
                .SingleOrDefaultAsync();

            if(element == null)
            {
                await CreateItemAsync(item, userId);
            }
            else
            {
                element.IsActive = true;
                await _repository.SaveAsync();
            }
        }

        public async Task DeleteAsync(int carId, string userId)
        {
            await Console.Out.WriteLineAsync($"{carId} {userId}");
            var item = await _repository.Wishlist
                .FindByCondition(
                    x => x.UserId == userId &&
                    x.CarId == carId, true)
                .SingleOrDefaultAsync() ?? throw new ArgumentException("not found");

            item.IsActive = false;
            await _repository.SaveAsync();
        }

        private async Task CreateItemAsync(WishlistDto item, string userId)
        {
            var newItem = new Wishlist()
            {
                CarId = item.CarId,
                UserId = userId,
                IsActive = true
            };

            _repository.Wishlist.Create(newItem);
            await _repository.SaveAsync();
        }
    }
}
