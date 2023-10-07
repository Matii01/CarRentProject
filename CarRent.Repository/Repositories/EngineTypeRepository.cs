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
    public class EngineTypeRepository : RepositoryBase<EngineType>, IEngineTypeRepository
    {
        public EngineTypeRepository(CarRentContext context) 
            : base(context)
        {
        }

        public async Task<IEnumerable<EngineType>> GetAllActiveEngineTypeAsync(bool trackChanges)
        {
            return await FindByCondition(x => x.IsActive == true, trackChanges).ToListAsync();
        }

        public async Task<IEnumerable<EngineType>> GetAllEngineTypeAsync(bool trackChanges)
        {
            return await All(trackChanges)
               .OrderBy(c => c.Name)
               .ToListAsync();
        }

        public async Task<EngineType> GetEngineTypeAsync(int id, bool trackChanges)
        {
            return await FindByCondition(x => x.Id == id, trackChanges).SingleOrDefaultAsync();
        }

        public void CreateEngineType(EngineType engineType)
        {
            Create(engineType);
        }

        public void DeleteEngineType(EngineType engineType)
        {
            Delete(engineType);
        }
    }
}
