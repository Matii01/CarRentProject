using CarRent.data.Models.CarRent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Interfaces.CarInterfaces
{
    public interface IGearboxTypeRepository
    {
        Task<IEnumerable<GearboxType>> GetAllGearboxTypeAsync(bool trackChanges);
        Task<IEnumerable<GearboxType>> GetAllActiveGearboxTypeAsync(bool trackChanges);
        Task<GearboxType> GetGearboxTypeAsync(int id, bool trackChanges);
        void CreateGearboxType(GearboxType gearboxType);
        void DeleteGearboxType(GearboxType gearboxType);
    }
}
