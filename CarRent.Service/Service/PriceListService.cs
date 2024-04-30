using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Exceptions;
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
        private readonly IRabatService _rabat;

        public PriceListService(
            IRepositoryManager repository,
            IRabatService rabat, 
            IMapper mapper)
            : base(repository, mapper)
        {
            _rabat = rabat;
        }

        public async Task<IEnumerable<PricelistItemDto>> GetCarPricelistForClient(int carId)
        {
            var pricelist = await _repository.PriceList
                .GetCarPriceListForClient(carId)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("Not found");  
 
            return await GetPricelistItems(pricelist.Id);
        }

        public async Task<IEnumerable<PriceListDto>> GetPriceListsForCar(int carId, bool trackChanges)
        {
            var priceLists = await _repository.PriceList
                .GetPriceListsForCar(carId, trackChanges)
                .Select(x => new PriceListDto(x.Id,x.CarId,x.Name, x.IsDefault))
                .ToListAsync();

            return priceLists;
        }

        public async Task<IEnumerable<PricelistItemDto>> GetPricelistItems(int priceListId)
        {
            var priceListItem = await _repository.PricelistItem
                .FindByCondition(x => x.PriceListId == priceListId && x.IsActive == true, false)
                .Select(x => new PricelistItemDto(x.Id, x.Days, x.Price, x.OverlimitFee))
                .ToListAsync();

            return priceListItem;
        }

        public async Task<IEnumerable<PricelistDateDto>> GetPricelistDate(int priceListId)
        {
            var pricelistDate = await _repository.PricelistDate
                .FindByCondition(x => x.PriceListId == priceListId && x.IsActive == true, false)
                .Select(x => new PricelistDateDto(x.Id, x.PriceListId, x.DateFrom, x.DateTo))
                .ToListAsync();

            return pricelistDate;
        }

        public async Task<PriceList> CreatePriceListForCarAsync(PriceListDto priceList)
        {
            var newPriceList = new PriceList
            {
                CarId = priceList.CarId,
                Name = priceList.Name,
                IsActive = true,
                IsDefault = false,
            };

            _repository.PriceList.Create(newPriceList);
            await _repository.SaveAsync();
            return newPriceList;
        }

        public async Task<PriceList> UpdatePriceListAsync(PriceListDto priceList)
        {
            var toUpdate = await _repository.PriceList
                .GetPriceListsById(priceList.Id, true)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("Not found");  

            toUpdate.Name = priceList.Name;
            await _repository.SaveAsync();
            return toUpdate;
        }

        public async Task UpdatePriceListItem(int id, PricelistItemDto pricelistItem)
        {
            var toUpdate = await _repository.PricelistItem.GetAsync(id, true)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("Not found");

            toUpdate.Price = pricelistItem.Price;
            toUpdate.OverlimitFee = pricelistItem.OverlimitFee;
            toUpdate.Days = pricelistItem.Days;
            await _repository.SaveAsync();
        }

        public async Task UpdatePriceListDates(int id, PricelistDateDto pricelistDate)
        {
            throw new NotImplementedException();
        }

        public async Task<PricelistItem> AddPosition(NewtPricelistItemDto item)
        {
            var newItem = new PricelistItem
            {
                PriceListId = item.PriceListId,
                Days = item.Days,
                Price = item.Price,
                OverlimitFee = item.OverlimitFee,
                IsActive = true
            };

            _repository.PricelistItem.Create(newItem);
            await _repository.SaveAsync();
            return newItem;
        }

        public async Task AddCarlistDate(PricelistDateDto dateDto)
        {
            if(!await CarPriceListExistForThisDateTime(dateDto))
            {
                PricelistDate pricelistDate = new()
                {
                    PriceListId = dateDto.PriceId,
                    DateFrom = dateDto.DateFrom,
                    DateTo = dateDto.DateTo,
                    IsActive = true,
                };
                _repository.PricelistDate.Create(pricelistDate);
                await _repository.SaveAsync();
            }
            else
            {
                throw new DataNotFoundException("Pricelist for this car for this DataTime already exist");
            }
        }

        public async Task<bool> CarPriceListExistForThisDateTime(PricelistDateDto dateDto)
        {
            var result = await _repository.PricelistDate
                .FindByCondition(
                    x => x.PriceListId == dateDto.PriceId &&
                    x.IsActive == true &&
                    !((dateDto.DateFrom > x.DateTo && dateDto.DateTo > x.DateTo) ||
                        (dateDto.DateFrom < x.DateFrom && dateDto.DateTo < x.DateFrom))
                    , false)
                .ToListAsync();

            if (result.IsNullOrEmpty())
            {
                return false;
            }
            return true;
        }

        public async Task RemovePosition(int itemId)
        {
            var item = await
                _repository.PricelistItem
                .FindByCondition(x => x.Id == itemId, true)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("Not found");

            item.IsActive = false;
            await _repository.SaveAsync();
        }

        public async Task RemovePriceListDate(int itemId)
        {
            var item = await
               _repository.PricelistDate
               .FindByCondition(x => x.Id == itemId, true)
               .SingleOrDefaultAsync() ?? throw new DataNotFoundException("Not found");  
             
            item.IsActive = false;
            await _repository.SaveAsync();
        }

        public async Task ChangeDefaultPriceList(int newDefaultPriceListId)
        {
            var newDefault = await _repository.PriceList
                .GetPriceListsById(newDefaultPriceListId, true)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("Not found");

            var list = await _repository.PriceList
                .GetPriceListsForCar(newDefault.CarId, true)
                .Where(x=> x.Id != newDefault.Id)
                .ToListAsync();

            foreach (var item in list)
            {
                item.IsDefault = false;
            }
            newDefault.IsDefault = true;
            await _repository.SaveAsync();
        }

        public async Task<PriceForCar> GetPriceForCarForDate(string? userId, NewRentalForClient rental)
        {
            var item = await GetPriceListItemForCarAndDate(rental);
            var rabat = await _rabat.CalculateRabat(rental.CarId, userId);

            if (item == null)
            {
                return new PriceForCar(0, 0, 0, 0, 0); 
            }

            await Console.Out.WriteLineAsync(item.Price.ToString());
            decimal total = item.Price * CalculateRentalDays(rental);
            decimal net = total * 0.77m; // 23% vat 

            var rabatValue = total * (rabat.RabatPercentValue / 100);

            PriceForCar priceForCar = new (rabatValue, net, total, 23, total - net);

            return priceForCar;
        }

        public async Task<decimal> GetCarPriceForOneDay(int carId)
        {
            return await _repository.PriceList.GetCarPriceForOneDay(carId);
        }

        private async Task<PricelistItem?> GetPriceListItemForCarAndDate(NewRentalForClient rental)
        {
            var priceList = await _repository.PriceList
                .GetCarPriceListForClient(rental.CarId, rental.DateFrom)
                .SingleOrDefaultAsync();

            if (priceList == null || priceList.PricelistItems == null)
            {
                return null;
            }

            int days = CalculateRentalDays(rental);
            return priceList.PricelistItems.Where(x => x.Days <= days).MaxBy(x => x.Days);
        }

        private int CalculateRentalDays(NewRentalForClient rental)
        {
            TimeSpan difference = rental.DateTo - rental.DateFrom;
            return (int)difference.TotalDays;
        }

        public Task DeletePriceList(int id)
        {
            throw new NotImplementedException();
        }
    }
}
