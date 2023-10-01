using CarRent.data.DTO;
using CarRent.data.RequestFeatures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface ICarService
    {
        Task<List<CarListDtoForClient>> GetCarListForClient(CarParameters carParameters);
        Task<CarDetailsDtoForClient> GetCarDetailsForClient(int id);
        
    }
}
