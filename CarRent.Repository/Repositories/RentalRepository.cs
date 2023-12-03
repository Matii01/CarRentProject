using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Abstract;
using CarRent.Repository.Extensions;
using CarRent.Repository.Interfaces;
using CarRent.Repository.Parameters;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Repositories
{
    public class RentalRepository : GenericRepository<Rental>, IRentalRepository
    {
        public RentalRepository(CarRentContext context) 
            : base(context)
        {
        }

        public async Task<PagedList<InvoiceDto>> GetInvoicesDataAsync(OrderParameters param, bool trackChanges)
        {
            var list = context.Invoices
                .Include(x => x.InvoicesItems)
                .ThenInclude(x => x.Rental)
                .Search(context, param);

            var newList = list
                .Select(x => new InvoiceDto(
                        x.Id,
                        x.Number,
                        x.Comment,
                        x.InvoicesItems.Select(y => new InvoiceItemDto(
                            y.InvoiceId,
                            y.Rabat,
                            y.Net,
                            y.Gross,
                            y.VAT,
                            y.VATValue,
                            y.Rental)
                        ).ToList()
                    ));

            var pagedList = await PagedList<InvoiceDto>
                 .ToPagedList(newList, param.PageNumber, param.PageSize);

            return pagedList;
        }

        public async Task<PagedList<RentalListData>> GetPagedListRentalActiveAsync(RentalParameters param, bool trackChanges)
        {
            var list = context.Rentals.Search(context, param)
                .Select(x => new RentalListData());

            var pagedList = await PagedList<RentalListData>
                .ToPagedList(list, param.PageNumber, param.PageSize);

            return pagedList;
        }
    }
}
