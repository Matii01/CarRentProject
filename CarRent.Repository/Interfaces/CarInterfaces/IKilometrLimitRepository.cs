using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Interfaces.CarInterfaces
{
    public interface IKilometrLimitRepository
    {
        Task<IEnumerable<KilometrLimit>> GetAllKilometrLimitAsync(bool trackChanges);
        Task<IEnumerable<KilometrLimit>> GetAllActiveKilometrLimitAsync(bool trackChanges);
        Task<KilometrLimit> GetKilometrLimitAsync(int id, bool trackChanges);
        void CreateKilometrLimit(KilometrLimit limit);
        void DeleteKilometrLimit(KilometrLimit limit);
    }
}
