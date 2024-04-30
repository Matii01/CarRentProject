using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Exceptions;
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
    public class TempService : ServiceBase
    {
        IPriceListService _priceList;
        public TempService(IRepositoryManager repository, IMapper mapper)
            : base(repository, mapper)
        {
        }

        public async Task<bool> CreateRentalAndAssignUser(
                string userId,
                string? paymentIntent,
                InvoiceDto invoiceDto,
                NewRentalForClient newRental,
                ClientDetailsDto clientDetails)
        {
            //if (await CarIsBusy(newRental))
            //{
            //    throw new DataNotFoundException("Car have rental on this time");
            //}

            var price = await _priceList.GetPriceForCarForDate(userId, newRental);
            string invoiceNumber = "generateInvoiceNumber";

            var userInvoice = new UserInvoice()
            {
                UserAccountId = userId,
                IsActive = true,
                Invoice = new Invoice
                {
                    Number = invoiceNumber,
                    Comment = invoiceDto.Comment,
                    PaymentIntentId = paymentIntent,
                    IsActive = true,
                    InvoiceStatus = 1, //; GetInvoiceStatusForPaidInvoice(),
                    TotalPaid = price.Gross,
                    TotalToPay = price.Gross,
                    CreatedDate = DateTime.Now,
                    PaymentDate = DateTime.Now,
                    IsEditable = false,
                    Client = new IndividualClient
                    {
                        FirstName = clientDetails.FirstName,
                        LastName = clientDetails.LastName,
                        Email = clientDetails.Email,
                        PhoneNumber = clientDetails.PhoneNumber,
                        Address = clientDetails.Address,
                        PostCode = clientDetails.PostCode,
                        City = clientDetails.City,
                        IsActive = true,
                    },
                    InvoicesItems = invoiceDto.InvoiceItems.Select(x => new InvoiceItem()
                    {
                        Rabat = x.Rabat,
                        Net = x.Net,
                        Gross = x.Gross,
                        PaidAmount = x.PaidAmount,
                        VAT = x.VAT,
                        VATValue = x.VATValue,
                        Rental = new Rental()
                        {
                            CarId = newRental.CarId,
                            RentalStart = newRental.DateFrom,
                            RentalEnd = newRental.DateTo,
                            RentalStatusId = 1, //DefaultRentalStatusId,
                            IsActive = true,
                        },
                        IsActive = true
                    }).ToList()
                }
            };

            _repository.UserInvoice.Create(userInvoice);
            await _repository.SaveAsync();

            var rentalId = userInvoice.Invoice.InvoicesItems.FirstOrDefault()?.Rental?.Id;
            // userId, rentalId

            return true;
        }
    }
}
