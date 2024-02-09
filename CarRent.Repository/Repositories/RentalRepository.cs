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

        public IQueryable<Rental> GetRentalForCar(int carId)
        {
            var currentDate = DateTime.Now.AddDays(-1);
            return FindByCondition(
                x => x.CarId == carId && x.RentalStart >= currentDate, false);
        }

        public async Task<NewInvoiceDto> GetInvoiceDataAsync(int invoiceId)
        {
            var invoice = context.Invoices
                .Where(x => x.Id == invoiceId)
                .Include(x => x.Client)
                .Include(x => x.InvoicesItems)
                .ThenInclude(x => x.Rental)
                .ThenInclude(x => x.Car)
                .ThenInclude(x => x.CarMake);



            var transformedData = await invoice
                .Select(x => new InvoiceWithClient(
                        x.Id,
                        x.InvoiceStatus,
                        x.Number,
                        x.Comment,
                        x.TotalToPay,
                        x.TotalPaid,
                        x.IsEditable,
                        x.Client,
                        x.InvoicesItems.Select(y => new InvoiceItemWithRentalDetailDto(
                            y.InvoiceId,
                            y.Rabat,
                            y.Net,
                            y.Gross,
                            y.PaidAmount,
                            y.VAT,
                            y.VATValue,
                            new RentalDetailsDto(
                                y.Rental.Id,
                                y.Rental.CarId, 
                                y.Rental.Car.Name, 
                                y.Rental.Car.CarImage, 
                                y.Rental.Car.CarMake.Name,
                                y.Rental.RentalStart,
                                y.Rental.RentalEnd,
                                y.Rental.RentalStatus.Status,
                                y.Rental.RentalStatusId
                                ))
                        ).ToList()
                    )).SingleOrDefaultAsync();

            return TransformInvoiceClient(transformedData);
        }

        public async Task<PagedList<InvoiceDto>> GetInvoicesDataAsync(OrderParameters param, bool trackChanges)
        {
            var list = context.Invoices
                .Include(x => x.Client)
                .Where(x => x.Client is IndividualClient)
                .Include(x => x.InvoicesItems)
                .ThenInclude(x => x.Rental)
                .Search(context, param);

            var newList = list
                .Select(x => new InvoiceDto(
                        x.Id,
                        x.Number,
                        x.Comment,
                        x.Client as IndividualClient,
                        x.InvoicesItems.Select(y => new InvoiceItemDto(
                            y.InvoiceId,
                            y.Rabat,
                            y.Net,
                            y.Gross,
                            y.PaidAmount,
                            y.VAT,
                            y.VATValue,
                            y.Rental)
                        ).ToList()
                    ));

            var pagedList = await PagedList<InvoiceDto>
                 .ToPagedList(newList, param.PageNumber, param.PageSize);

            return pagedList;
        }

        public async Task<InvoiceDto> GetRentalInfoByPaymentId(string paymentId)
        {
            var newList = await context.Invoices
                .Include(x => x.InvoicesItems)
                .ThenInclude(x => x.Rental)
                .Where(x => x.PaymentIntentId == paymentId)
                .Select(x => new InvoiceDto(
                        x.Id,
                        x.Number,
                        x.Comment,
                        x.Client as IndividualClient,
                        x.InvoicesItems.Select(y => new InvoiceItemDto(
                            y.InvoiceId,
                            y.Rabat,
                            y.Net,
                            y.Gross,
                            y.PaidAmount,
                            y.VAT,
                            y.VATValue,
                            y.Rental)
                        ).ToList()
                    ))
                .SingleOrDefaultAsync();

            return newList;
        }
        

        public async Task<PagedList<RentalListDataDto>> GetPagedListRentalActiveAsync(RentalParameters param, bool trackChanges)
        {
            var list = context.Rentals
                .OrderByDescending(x => x.RentalStart)
                .Include(x => x.RentalStatus)
                .Include(c => c.Car)
                .Include(x => x.InvoiceItem)
                .ThenInclude(i => i.Invoice)
                .ThenInclude(i => i.Client)
                .Search(context, param)
                .Select(x => new RentalListDto(
                        x.Id,
                        x.InvoiceItem.Invoice.Client,
                        x.Car.Name, 
                        x.RentalStatus.Status,
                        x.RentalStart, 
                        x.RentalEnd)
                );

            var pagedList = await PagedList<RentalListDto>
                .ToPagedList(list, param.PageNumber, param.PageSize);
            
            return GetTransformedPagedList(pagedList);
        }

        public async Task<IEnumerable<UserRentalListDto>> GetUserRentalsAsync(string userId)
        {
            var items = await context.UserRentals
                .Where(x => x.UserAccountId == userId)
                .Include(x => x.Rental)
                .ThenInclude(x => x.Car)
                .OrderByDescending(x => x.Rental.RentalStart)
                .Select(x => new UserRentalListDto(
                        x.RentalId,
                        x.Rental.InvoiceItem.InvoiceId,
                        x.Rental.RentalStatus.Status,
                        x.Rental.Car.Name,
                        x.Rental.RentalStart,
                        x.Rental.RentalEnd)
                ).ToListAsync();

            return items;
        }

        //public async Task<UserRentalDetailDto> GetUserRentalDetailAsync(string userId, int id)
        public async Task<UserRentalDetailDto> GetUserRentalDetailAsync(string userId, int rentalId)
        {
            var invoiceId = await GetInvoiceIdByRentalId(rentalId);

            if (!await IsUserRentalByInvoiceId(userId, invoiceId))
            {
                throw new Exception("User do not have permission");
            }

            var item = await context.Rentals
                .Where(x => x.Id == rentalId)
                .Include(x => x.InvoiceItem)
                .Include(x => x.Car)
                .Include(x => x.RentalStatus)
                .SingleOrDefaultAsync();


            var userRental = new UserRentalDetailDto(
                    rentalId,invoiceId,
                    "",
                    item.CarId,
                    item.Car.Name,
                    item.Car.CarImage,
                    item.RentalStatus.Status,
                    item.InvoiceItem.Gross - item.InvoiceItem.Rabat,
                    item.InvoiceItem.VAT,
                    item.RentalStart,
                    item.RentalEnd
                );

            return userRental;
        }

        public async Task<int> GetInvoiceIdByRentalId(int rentalId)
        {
            return await context.Rentals
                .Where(x => x.Id == rentalId)
                .Include(x => x.InvoiceItem)
                .Select(x => x.InvoiceItem.InvoiceId)
                .SingleOrDefaultAsync();
        } 

        private async Task<bool> IsUserRentalByInvoiceId(string userId, int invoiceId)
        {
            var item = await context
                .UserInvoices
                .Where(x => x.InvoiceId == invoiceId)
                .Select(x => x.UserAccountId)
                .SingleOrDefaultAsync();

            return userId.Equals(item);
        }

        private static PagedList<RentalListDataDto> GetTransformedPagedList(PagedList<RentalListDto> pagedList)
        {
            var newItems = new List<RentalListDataDto>();
            foreach (var item in pagedList.Items)
            {
                if (item.Client is IndividualClient)
                {
                    var c = item.Client as IndividualClient;
                    newItems.Add(new RentalListDataDto(item.Id, c.FirstName +" "+ c.LastName, item.CarName, item.Status, item.RentalStart, item.RentalEnd));
                }
                else if (item.Client is FirmClient)
                {
                    var c = item.Client as FirmClient;
                    newItems.Add(new RentalListDataDto(item.Id, c.CompanyName, item.CarName, item.Status, item.RentalStart, item.RentalEnd));
                }
            }

            var newPagedList = new PagedList<RentalListDataDto>(newItems, pagedList.MetaData.TotalCount, pagedList.MetaData.CurrentPage, pagedList.MetaData.PageSize);

            return newPagedList;
        }

        private static NewInvoiceDto TransformInvoiceClient(InvoiceWithClient invoice)
        {
            if (invoice.Client is IndividualClient)
            {
                var c = invoice.Client as IndividualClient;
                var newInvoice = new NewInvoiceDto(true, null, new InvoiceWithIndividualClient(
                        invoice.Id,
                        invoice.InvoiceStatusId,
                        invoice.Number,
                        invoice.Comment,
                        true,
                        invoice.TotalToPay,
                        invoice.TotalPay,
                        invoice.IsEditable,
                        invoice.Client as IndividualClient,
                        invoice.InvoiceItems
                    ));
                return newInvoice;
            }
            else
            {
                var c = invoice.Client as FirmClient;
                var newInvoice = new NewInvoiceDto(true, new InvoiceWithFirmClient(
                        invoice.Id,
                        invoice.InvoiceStatusId,
                        invoice.Number,
                        invoice.Comment,
                        true,
                        invoice.TotalToPay,
                        invoice.TotalPay,
                        invoice.IsEditable,
                        new FirmClientDto(c.PostCode,c.City, c.NIP, c.CompanyName, c.StreetAndNumber),
                        invoice.InvoiceItems
                    ), 
                    null);
                return newInvoice;
            }
        }

        private async Task<bool> IsUserRentalByRentalId(string userId, int rentalId)
        {
            var invoiceId = await GetInvoiceIdByRentalId(rentalId);

            var item = await context
                .UserInvoices
                .Where(x => x.InvoiceId == invoiceId)
                .Select(x => x.UserAccountId)
                .SingleOrDefaultAsync();

            return userId.Equals(item);
        }

        private ClientDetailsDto GetClientDetailsDto(Client client)
        {
            var c = client as IndividualClient;

            if (c == null)
            {
                throw new Exception("");
            }

            return new ClientDetailsDto(
                c.FirstName,
                c.LastName,
                c.Email,
                c.PhoneNumber,
                c.Address,
                c.PostCode,
                c.City
                );
        }
    }
}
