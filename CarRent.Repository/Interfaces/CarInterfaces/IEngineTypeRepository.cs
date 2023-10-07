using CarRent.data.Models.CarRent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Interfaces.CarInterfaces
{
    public interface IEngineTypeRepository
    {
        Task<IEnumerable<EngineType>> GetAllEngineTypeAsync(bool trackChanges);
        Task<IEnumerable<EngineType>> GetAllActiveEngineTypeAsync(bool trackChanges);
        Task<EngineType> GetEngineTypeAsync(int id, bool trackChanges);
        void CreateEngineType(EngineType engineType);
        void DeleteEngineType(EngineType engineType);
    }
}
