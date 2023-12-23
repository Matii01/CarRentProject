using CarRent.data.Models;
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

        public IQueryable<PriceList> GetCarPriceListForClient(int carId)
        {
            return GetCarPriceListForClient(carId, DateTime.Now);
        }
        public IQueryable<PriceList> GetCarPriceListForClient(int carId, DateTime currentData)
        {
            var pricelist =  context.PricesList
                .Include(x => x.PricelistDates)
                .Include(x=>x.PricelistItems)
                .Where(x =>x.CarId == carId )
                .Where(x => x.PricelistDates
                    .Any(x => x.DateFrom<=currentData && x.DateTo >= currentData));

            return pricelist;
        }

        public async Task <decimal> GetCarPriceForOneDay(int carId)
        {
            var currentData = DateTime.Now;

            var pricelist = context.PricesList
                .Include(x => x.PricelistDates)
                .Include(x => x.PricelistItems)
                .Where(x => x.CarId == carId)
                .Where(x => x.PricelistDates
                    .Any(x => x.DateFrom <= currentData && x.DateTo >= currentData));

            var listItem = await pricelist
                .Select(x => x.PricelistItems.Where(x => x.Days == 1))
                .SingleOrDefaultAsync();

            if(listItem == null)
            {
                return 0;
            }

            var item = listItem.SingleOrDefault();

            if(item == null)
            {
                return 0;
            }

            return item.Price;
        }

        public IQueryable<PriceList> GetPriceListsForCar(int carId, bool trackChanges)
        {
            var priceList = FindByCondition(x => x.CarId == carId && x.IsActive == true, trackChanges);
            return priceList;
        }

        public IQueryable<PriceList> GetPriceListsById(int pricelistId, bool trackChanges)
        {
            var priceList = FindByCondition(x => x.Id == pricelistId && x.IsActive == true, trackChanges);
            return priceList;
        }

        public IQueryable<PriceList> GetCurrentPriceList(int carId, bool trackChanges)
        {
            throw new NotImplementedException();

            //DateTime dateTime = DateTime.Now;

            //var priceList = FindByCondition(
            //        x => x.CarId == carId &&
            //        x.IsActive == true &&
            //        x.DateFrom <= dateTime &&
            //        x.DateTo >= dateTime
            //        , trackChanges);

            //return priceList;
        }
    }
}
