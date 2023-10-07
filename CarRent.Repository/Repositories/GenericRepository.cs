using CarRent.data.Models;
using CarRent.Repository.Abstract;
using CarRent.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Repositories
{
    public class GenericRepository<T> : RepositoryBase<T>, IGenericRepository<T> where T : BaseModel
    {
        public GenericRepository(CarRentContext context) : base(context)
        {
        }

        public async Task<IEnumerable<T>> GetAllAsync(bool trackChanges)
        {
            return await All(trackChanges)
                .ToListAsync();
        }

        public async Task<IEnumerable<T>> GetAllActiveAsync(bool trackChanges)
        {
            return await FindByCondition(x => x.IsActive == true, trackChanges).ToListAsync();
        }

        public Task<T> GetAsync(int id, bool trackChanges)
        {
            throw new NotImplementedException();
        }
    }
}
