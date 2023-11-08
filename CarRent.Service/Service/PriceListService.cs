using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Interfaces;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Service
{
    public class PriceListService : ServiceBase, IPriceListService
    {
        public PriceListService(IRepositoryManager repository, IMapper mapper)
            : base(repository, mapper)
        {
        }

        public async Task<IEnumerable<PriceListDto>?> GetPriceListsForCar(int carId, bool trackChanges)
        {
            var priceList  = await _repository
                .PriceList.GetPriceListsForCar(carId, trackChanges)
                .Select(x => new PriceListDto(x.Id, x.CarId, x.DateFrom, x.DateTo))
                .ToListAsync();

            return priceList;
        }

        public async Task<PriceList> CreatePriceListForCarAsync(PriceListDto priceList)
        {
            if(priceList.DateFrom >  priceList.DateTo) 
            {
                throw new Exception("Data From > Data To");
            }

            var newPriceList = new PriceList 
            { 
                CarId = priceList.CarId,
                DateFrom = priceList.DateFrom,
                DateTo = priceList.DateTo,
                IsActive = true,
            };

            _repository.PriceList.Create(newPriceList);
            await _repository.SaveAsync();
            return newPriceList;
        }

        public async Task AddPosition(NewtPricelistItemDto item)
        {
            var newItem = new PricelistItem
            {
                PriceListId = item.PriceListId,
                Days = item.Days,
                Price = item.Price,
                IsActive = true
            };

            _repository.PricelistItem.Create(newItem);
            await _repository.SaveAsync();
        }

        public async Task<IEnumerable<PricelistItemDto>> GetPriceList(int id, bool trackChanges)
        {
            var priceList = await _repository.PricelistItem
                .FindByCondition(x => x.PriceListId == id && x.IsActive == true, trackChanges)
                .Select(x => new PricelistItemDto(x.Id, x.Days, x.Price))
                .ToListAsync();

            return priceList;
        }

        public async Task RemovePosition(int itemId)
        {
            //await _repository.PricelistItem.RemovePriceListPosition(itemId);
            //await _repository.SaveAsync();
        }

        public async Task<bool> CarPriceListExistForThisDateTime(PriceListDto carList)
        {
               //GetPriceListForDateTime
            var car = await _repository.PriceList
                .GetPriceListForDateTime(carList.CarId, carList.DateFrom, carList.DateTo, false)
                .ToListAsync();

            if(car.IsNullOrEmpty())
            {
                return false;
            }
            return true;
        }
    }
}
