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

        public void AddPriceListPosition(PricelistItem item)
        {
            context.PricelistItems.Add(item);
        }

        public async Task<IEnumerable<PricelistItem>> GetPricelistItems(int id, bool trackChanges)
        {
            var lista = !trackChanges ?
                context.PricelistItems.AsNoTracking().Where(x => x.PriceListId == id && x.IsActive == true) :
                context.PricelistItems.Where(x => x.PriceListId == id && x.IsActive == true);

            return await lista.ToListAsync();
        }

        public async Task RemovePriceListPosition(int itemId)
        {
            var item = await context.PricelistItems.SingleOrDefaultAsync(x => x.Id == itemId);
            if(item != null)
            {
                item.IsActive = false;
            }
        }
    }
}
