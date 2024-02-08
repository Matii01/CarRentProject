using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Exceptions;
using CarRent.data.Models.CarRent;
using CarRent.data.Models.User;
using CarRent.Repository.Interfaces;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Service
{
    public class RabatService : ServiceBase, IRabatService
    {
        public const decimal MAX_RABAT_VAlUE = 50;
        private readonly INotificationService _notification;

        public RabatService(IRepositoryManager repository, INotificationService notification, IMapper mapper) 
            : base(repository, mapper)
        {
            _notification = notification;
        }

        public async Task<IEnumerable<RabatDto>> GetCurrentRabat()
        {
            var rabats = await _repository.Rabat
                .FindByCondition(x => x.IsActive == true, false)
                .Select(x => new RabatDto(x.Id, x.RabatPercentValue))
                .ToArrayAsync();

            return rabats;
        }

        /// <summary>
        /// Return current rabat for given car or rabat with value 0
        /// </summary>
        /// <param name="carId"></param>
        /// <returns></returns>
        public async Task<RabatValueDto> GetRabatForCar(int carId)
        {
            var data = DateTime.Now;
            var carRabat = await _repository.Rabat
                .FindByCondition(
                    x => x.IsActive == true && 
                    x.CarId == carId && 
                    x.DateFrom <= data &&
                    x.DateTo >= data
                    , false)
                .Select(x => new RabatValueDto(x.RabatPercentValue))
                .SingleOrDefaultAsync();

            return carRabat ?? new RabatValueDto(0);
        }

        /// <summary>
        /// Return current rabat for given user or rabat with value 0
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<RabatValueDto> GetUserRabat(string userId)
        {
            var data = DateTime.Now;
            var userRabat = await _repository.RabatForUser
                .FindByCondition(
                    x => x.IsActive == true && 
                    x.UserAccountId == userId &&
                    x.IsUsed == false && 
                    x.DateOfExpiration >= data
                    , false)
                .Select(x => new RabatValueDto(x.RabatPercentValue))
                .SingleOrDefaultAsync();

            return userRabat ?? new RabatValueDto(0);
        }

        public async Task<IEnumerable<CarRabatDto>> GetCarRabats(int carId)
        {
            var carRabats = await _repository.Rabat
                .FindByCondition(x => x.IsActive == true && x.CarId == carId, false)
                .Select(x => new CarRabatDto(x.Id, x.RabatPercentValue, x.DateFrom, x.DateTo))
                .ToListAsync();

            return carRabats;
        }

        public async Task<IEnumerable<RabatForUserDto>> GetUserRabats(string userId)
        {
            var data = DateTime.Now;
            var userRabat = await _repository.RabatForUser
                .FindByCondition(
                    x => x.IsActive == true &&
                    x.UserAccountId == userId &&
                    x.IsUsed == false &&
                    x.DateOfExpiration >= data
                    , false)
                .Select(x => new RabatForUserDto(
                        x.Id,
                        x.UserAccountId,
                        x.Title,
                        x.RabatPercentValue,
                        x.IsUsed,
                        x.DateOfExpiration
                    ))
                .ToListAsync();

            return userRabat;
        }

        public async Task AddCarRabat(int carId, CarRabatDto newRabat)
        {
            if (newRabat.RabatPercentValue > MAX_RABAT_VAlUE || newRabat.RabatPercentValue <= 0)
            {
                throw new RabatRangeBadRequest();
            }

            if (!await CanAddRabat(carId, newRabat))
            {
                throw new DatesTakenException();
            }

            Rabat rabat = new()
            {
                CarId = carId,
                RabatPercentValue = newRabat.RabatPercentValue,
                DateFrom = newRabat.DateFrom,
                DateTo = newRabat.DateTo,
                IsActive = true,
            };
            _repository.Rabat.Create(rabat);
            await _repository.SaveAsync();
        }

        public async Task AddRabatForUser(NewRabatForUserDto newRabat)
        {
            if(newRabat.RabatPercentValue > MAX_RABAT_VAlUE || newRabat.RabatPercentValue <= 0)
            {
                throw new RabatRangeBadRequest();
            }

            if(!await CanAddRabat(newRabat))
            {
                throw new UserHaveRabatException();
            }

            RabatForUser rabat = new ()
            {
                Title = newRabat.Title,
                IsActive = true,
                IsUsed = false,
                UserAccountId = newRabat.UserId,
                DateOfExpiration = newRabat.DateOfExpiration,
                RabatPercentValue = newRabat.RabatPercentValue  
            };

            _repository.RabatForUser.Create(rabat);
            await _repository.SaveAsync();
            await _notification.SendAddedRabatNotificationAsync(newRabat.UserId, newRabat);
        }

        private async Task<bool> CanAddRabat(int carId, CarRabatDto newRabat)
        {
            var data = DateTime.Now;
            if(newRabat.DateTo < data)
            {
                return false;
            }

            var rabats = await _repository.Rabat.FindByCondition(x =>
                x.IsActive == true &&
                   !((newRabat.DateFrom > x.DateTo && newRabat.DateTo > x.DateTo) ||
                       (newRabat.DateFrom < x.DateFrom && newRabat.DateTo < x.DateFrom))
                    , false).
                    ToListAsync();

            if (rabats.IsNullOrEmpty())
            {
                return true;
            }
            return false;
        }

        private async Task<bool> CanAddRabat(NewRabatForUserDto newRabat)
        {
            var data = DateTime.Now;
            var userRabat = await _repository.RabatForUser
                .FindByCondition(
                    x => x.IsActive == true &&
                    x.IsUsed == false &&
                    x.UserAccountId == newRabat.UserId &&
                    x.DateOfExpiration >= data
                    , false)
                .ToListAsync();
            
            if (userRabat.IsNullOrEmpty())
            {
                return true;
            }
            return false;
        }


        /// <summary>
        /// Combine rabat for user and for car and return rabat for rental 
        /// </summary>
        /// <param name="carId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<RabatValueDto> CalculateRabat(int carId, string? userId)
        {
            if(userId != null)
            {
                var userRabat = await GetUserRabat(userId);
                var carRabat = await GetRabatForCar(carId);
                
                if(userRabat.RabatPercentValue + carRabat.RabatPercentValue > MAX_RABAT_VAlUE)
                {
                    return new RabatValueDto(MAX_RABAT_VAlUE);
                }

                return new RabatValueDto(userRabat.RabatPercentValue + carRabat.RabatPercentValue);
            }
            else
            {
                return await GetRabatForCar(carId);
            }
        }

        public async Task DeleteCarRabat(int rabatId)
        {
            var rabat = await _repository.Rabat
                .GetAsync(rabatId, true)
                .SingleOrDefaultAsync() ?? throw new Exception("Not found");

            rabat.IsActive = false;
            await _repository.SaveAsync();
        }

        public async Task DeleteUserRabat(int rabatId)
        {
            var userRabat = await _repository.RabatForUser
                .GetAsync(rabatId, true)
                .SingleOrDefaultAsync() ?? throw new Exception("Not found");

            userRabat.IsActive = false; 
            await _repository.SaveAsync();
        } 
    }
}
