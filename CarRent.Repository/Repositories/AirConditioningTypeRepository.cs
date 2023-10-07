using CarRent.data.Models.CarRent;
using CarRent.Repository.Abstract;
using CarRent.Repository.Interfaces.CarInterfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Repositories
{
    public class AirConditioningTypeRepository : RepositoryBase<AirConditioningType>, IAirConditioningTypeRepository
    {
        public AirConditioningTypeRepository(CarRentContext context) : base(context)
        {
        }

        public async Task<AirConditioningType> GetAirConditioningTypeAsync(int id, bool trackChanges)
        {
            return await FindByCondition(x => x.Id == id, trackChanges).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<AirConditioningType>> GetAllActiveAirConditioningTypeAsync(bool trackChanges)
        {
            return await FindByCondition(x => x.IsActive == true, trackChanges).ToListAsync();
        }

        public async Task<IEnumerable<AirConditioningType>> GetAllAirConditioningTypeAsync(bool trackChanges)
        {
            return await All(trackChanges)
               .OrderBy(c => c.Name)
               .ToListAsync();
        }

        public void CreateAirConditioningType(AirConditioningType airConditioningType)
        {
            Create(airConditioningType);
        }

        public void DeleteAirConditioningType(AirConditioningType airConditioningType)
        {
            Delete(airConditioningType);
        }
    }
}
