using CarRent.data.Models.CarRent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Interfaces
{
    public interface ICarMakeRepository
    {
        Task<IEnumerable<CarMake>> GetAllCarMakeAsync(bool trackChanges);
        Task<CarMake> GetCarMakeAsync(int id, bool trackChanges);
        void CreateCarMake(CarMake carMake);
        void DeleteCarMake(CarMake carMake);
    }
}
