using CarRent.data.DTO;
using CarRent.data.RequestFeatures;
using CarRent.Repository;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CarRent.Service.Service
{
    public class CarService : ICarService
    {
        private readonly CarRentContext _context;

        public CarService(CarRentContext context)
        {
            _context = context;
        }

        public async Task<List<CarListDtoForClient>> GetCarListForClient(CarParameters carParameters)
        {
            var list = await _context.Cars.Select(x => new CarListDtoForClient(x.Name, x.GearBoxType.Name, x.AirConditioningType.Name, x.AverageCombustion.ToString(), 0))
                .ToListAsync();

            return list;
        }

        public Task<CarDetailsDtoForClient> GetCarDetailsForClient(int id)
        {
            //throw new NotImplementedException();
            return null;
        }
    }
}
