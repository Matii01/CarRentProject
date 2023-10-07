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
    public class GearboxTypeRepository : RepositoryBase<GearboxType>, IGearboxTypeRepository
    {
        public GearboxTypeRepository(CarRentContext context) : base(context)
        {
        }

       
        public async Task<IEnumerable<GearboxType>> GetAllActiveGearboxTypeAsync(bool trackChanges)
        {
            return await FindByCondition(x => x.IsActive == true, trackChanges).ToListAsync();
        }

        public async Task<IEnumerable<GearboxType>> GetAllGearboxTypeAsync(bool trackChanges)
        {
            return await All(trackChanges)
                .OrderBy(c => c.Name)
                .ToListAsync();
        }

        public async Task<GearboxType> GetGearboxTypeAsync(int id, bool trackChanges)
        {
            return await FindByCondition(x => x.Id == id, trackChanges).SingleOrDefaultAsync();
        }
        public void CreateGearboxType(GearboxType gearboxType)
        {
            Create(gearboxType);
        }

        public void DeleteGearboxType(GearboxType gearboxType)
        {
            Delete(gearboxType);
        }
    }
}
