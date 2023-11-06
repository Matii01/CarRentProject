using CarRent.data.Models.CarRent;
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
    public class PriceListRepository : RepositoryBase<PriceList>, IPriceListRepository
    {
        public PriceListRepository(CarRentContext context) 
            : base(context)
        {
        }

        public IQueryable<PriceList> GetPriceListForCar(int carId, bool trackChanges)
        {
            var priceList = FindByCondition(x => x.CarId == carId, trackChanges);
            return priceList;
        }
    }
}
