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
    public class CarMakeRepository : RepositoryBase<CarMake>, ICarMakeRepository
    {
        public CarMakeRepository(CarRentContext context) 
            : base(context)
        {

        }

        public async Task<IEnumerable<CarMake>> GetAllCarMakeAsync(bool trackChanges)
        {
            return await All(trackChanges)
                .OrderBy(c => c.Name)
                .ToListAsync();
        }

        public async Task<IEnumerable<CarMake>> GetAllActiveCarMakeAsync(bool trackChanges)
        {
            return await FindByCondition(x => x.IsActive == true, trackChanges).ToListAsync();
        }

        public async Task<CarMake> GetCarMakeAsync(int id, bool trackChanges)
        {
            return await FindByCondition(x => x.Id == id, trackChanges).SingleOrDefaultAsync();
        }

        public void CreateCarMake(CarMake carMake)
        {
            Create(carMake);
        }

        public void DeleteCarMake(CarMake carMake)
        {
            Delete(carMake);
        }
    }
}
