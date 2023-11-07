using CarRent.data.Models.CarRent;
using CarRent.Repository.Abstract;
using CarRent.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.InteropServices;
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

        public IQueryable<PriceList> GetPriceListsForCar(int carId, bool trackChanges)
        {
            var priceList = FindByCondition(x => x.CarId == carId && x.IsActive == true, trackChanges);
            return priceList;
        }

        public IQueryable<PriceList> GetPriceListForDateTime(int carId, DateTime from, DateTime to, bool trackChanges)
        {
            var priceList = FindByCondition(
                    x => x.CarId == carId && 
                    x.IsActive == true &&
                    !((from >x.DateTo && to > x.DateTo) || (from < x.DateFrom && to < x.DateFrom))
                    , trackChanges);
            
            return priceList;
        }

        public IQueryable<PriceList> GetCurrentPriceList(int carId, bool trackChanges)
        {
            DateTime dateTime = DateTime.Now;

            var priceList = FindByCondition(
                    x => x.CarId == carId &&
                    x.IsActive == true &&
                    x.DateFrom <= dateTime &&
                    x.DateTo >= dateTime
                    , trackChanges);

            return priceList;
        }
    }
}
