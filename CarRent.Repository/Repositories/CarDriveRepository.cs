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
    public class CarDriveRepository : RepositoryBase<CarDrive>, ICarDriveRepository
    {
        public CarDriveRepository(CarRentContext context)
            : base(context)
        {
        }
        

        public async Task<IEnumerable<CarDrive>> GetAllActiveCarDriveAsync(bool trackChanges)
        {
            return await FindByCondition(x => x.IsActive == true, trackChanges).ToListAsync();
        }

        public async Task<IEnumerable<CarDrive>> GetAllCarDriveAsync(bool trackChanges)
        {
            return await All(trackChanges)
               .OrderBy(c => c.Name)
               .ToListAsync();
        }

        public async Task<CarDrive> GetCarDriveAsync(int id, bool trackChanges)
        {
            return await FindByCondition(x => x.Id == id, trackChanges).SingleOrDefaultAsync();
        }
        public void CreateCarDrive(CarDrive carDrive)
        {
            Create(carDrive);
        }

        public void DeleteCarDrive(CarDrive carDrive)
        {
            Delete(carDrive);
        }
    }
}
