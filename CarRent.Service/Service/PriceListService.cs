using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Interfaces;
using CarRent.Service.Interfaces;
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

        public async Task AddPosition(NewtPricelistItemDto item)
        {
            var newItem = new PricelistItem
            {
                PriceListId = item.PriceListId,
                Days = item.Days,
                Price = item.Price,
                IsActive = true
            };
            _repository.PriceList.AddPriceListPosition(newItem);
            await _repository.SaveAsync();
        }

        public async Task<IEnumerable<PricelistItemDto>> GetPriceList(int id, bool trackChanges)
        {
            var list = await _repository.PriceList
                .GetPricelistItems(id, trackChanges);

            return list.Select(x => new PricelistItemDto(x.Id, x.Days, x.Price));
        }

        public async Task RemovePosition(int itemId)
        {
            await _repository.PriceList.RemovePriceListPosition(itemId);
            await _repository.SaveAsync();
        }
    }
}
