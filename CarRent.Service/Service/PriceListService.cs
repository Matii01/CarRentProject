using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Interfaces;
using CarRent.Repository.Migrations;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;
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

        public async Task<IEnumerable<PricelistItemDto>?> GetPriceListForCar(int carId, bool trackChanges)
        {
            var priceList = await _repository.PriceList
                    .GetPriceListForCar(carId, trackChanges)
                    .SingleOrDefaultAsync();

            if(priceList == null) 
            {
                return null;
            }

            var priceListItems = await _repository.PricelistItem
                .FindByCondition(x => x.PriceListId == priceList.Id && x.IsActive == true, trackChanges)
                .Select(x => new PricelistItemDto(x.Id, x.Days, x.Price))
                .ToListAsync();

            return priceListItems;
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

        public async Task<bool> CarPriceListExist(int carId)
        {
            var carList = await _repository.PriceList
                .GetPriceListForCar(carId, false)
                .SingleOrDefaultAsync();

            return carList != null;
        }
    }
}
