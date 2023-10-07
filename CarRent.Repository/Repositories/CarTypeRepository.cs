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
    public class CarTypeRepository : RepositoryBase<CarType>, ICarTypeRepository
    {
        public CarTypeRepository(CarRentContext context) : base(context)
        {
        }

        public async Task<IEnumerable<CarType>> GetAllCarTypeAsync(bool trackChanges)
        {
            return await All(trackChanges)
                .OrderBy(x => x.Name)
                .ToListAsync();
        }
        public async Task<IEnumerable<CarType>> GetAllActiveCarTypeAsync(bool trackChanges)
        {
            return await FindByCondition(x => x.IsActive == true, trackChanges)
                .ToListAsync();
        }

        public async Task<CarType> GetCarTypeAsync(int id, bool trackChanges)
        {
            return await FindByCondition(x => x.Id == id, trackChanges)
                .SingleOrDefaultAsync();
        }
        public void CreateCarType(CarType carType)
        {
            Create(carType);
        }

        public void DeleteCarType(CarType carType)
        {
            Delete(carType);
        }
    }
}
