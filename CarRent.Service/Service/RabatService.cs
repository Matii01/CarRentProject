using AutoMapper;
using CarRent.data.DTO;
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
    public class RabatService : ServiceBase, IRabatService
    {
        public const decimal MAX_RABAT_VAlUE = 50;
        public RabatService(IRepositoryManager repository, IMapper mapper) 
            : base(repository, mapper)
        {
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
                    x.DateOfExpiration <= data
                    , false)
                .Select(x => new RabatValueDto(x.RabatPercentValue))
                .SingleOrDefaultAsync();

            return userRabat ?? new RabatValueDto(0);
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
    }
}
