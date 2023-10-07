using CarRent.data.DTO;
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
    public class KilometrLimitRepository : RepositoryBase<KilometrLimit>, IKilometrLimitRepository
    {
        public KilometrLimitRepository(CarRentContext context) 
            : base(context)
        {

        }

        public async Task<IEnumerable<KilometrLimit>> GetAllActiveKilometrLimitAsync(bool trackChanges)
        {
            return await FindByCondition(x => x.IsActive == true, trackChanges).ToListAsync();
        }

        public async Task<IEnumerable<KilometrLimit>> GetAllKilometrLimitAsync(bool trackChanges)
        {
            return await All(trackChanges)
                .OrderBy(c => c.LimitValue)
                .ToListAsync();
        }

        public async Task<KilometrLimit> GetKilometrLimitAsync(int id, bool trackChanges)
        {
            return await FindByCondition(x => x.Id == id, trackChanges).SingleOrDefaultAsync();
        }

        public void CreateKilometrLimit(KilometrLimit limit)
        {
            Create(limit);
        }

        public void DeleteKilometrLimit(KilometrLimit limit)
        {
            Delete(limit);
        }
    }
}
