using CarRent.data.Models.CarRent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Interfaces.CarInterfaces
{
    public interface IAirConditioningTypeRepository
    {
        Task<IEnumerable<AirConditioningType>> GetAllAirConditioningTypeAsync(bool trackChanges);
        Task<IEnumerable<AirConditioningType>> GetAllActiveAirConditioningTypeAsync(bool trackChanges);
        Task<AirConditioningType> GetAirConditioningTypeAsync(int id, bool trackChanges);
        void CreateAirConditioningType(AirConditioningType carMake);
        void DeleteAirConditioningType(AirConditioningType carMake);
    }
}
