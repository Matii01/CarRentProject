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
    public class RentalService : ServiceBase, IRentalService
    {
        private readonly IPriceListService _priceList;

        public RentalService(
            IRepositoryManager repository,
            IPriceListService priceList,
            IMapper mapper) 
            : base(repository, mapper)
        {
           _priceList = priceList;
        }

        public async Task<string> CreateRentalAndInvoiceAndAssignUser(string userId,
                InvoiceDto invoiceDto,
                NewRentalForClient newRental,
                ClientDetailsDto clientDetails)
        {
            if (await CarIsBusy(newRental))
            {
                throw new Exception("Car have rental on this time");
            }
            var price = await _priceList.GetPriceForCarForDate(userId, newRental);

            string invoiceNumber = await GetInvoiceNumber();
            var Invoice = new Invoice { Number = invoiceNumber, Comment = invoiceDto.Comment, IsActive = true, };
            var ClientDetails = GetClientDetails(clientDetails);

            _repository.ClientDetails.Create(ClientDetails);
            _repository.Invoice.Create(Invoice);
            await _repository.SaveAsync();

            var invoiceClient = new InvoiceClient { InvoiceId = Invoice.Id, ClientDetailsId = ClientDetails.Id, IsActive = true, };
            _repository.InvoiceClient.Create(invoiceClient);

            var Rental = CreateRental(newRental);
            Rental.InvoiceItem = new InvoiceItem
            {
                Rabat = price.Rabat,
                Net = price.Net,
                Gross = price.Gross,
                VAT = price.VAT,
                VATValue = price.VATValue,
                InvoiceId = Invoice.Id,
                RentalId = Rental.Id,
                IsActive = true,
            };

            _repository.Rentals.Create(Rental);
            await _repository.SaveAsync();
            await CreateUserRental(userId, Rental.Id);

            return "OK";
        }

        private Rental CreateRental(NewRentalForClient newRental)
        {
            Rental rental = new()
            {
                CarId = newRental.CarId,
                RentalStart = newRental.DateFrom,
                RentalEnd = newRental.DateTo,
                IsActive = true
            };
            return rental;
        }

        private async Task<string> GetInvoiceNumber()
        {
            string number = "NR/12";
            return number;
        }

        private ClientDetails GetClientDetails(ClientDetailsDto clientDetails)
        {
            return new ClientDetails
            {
                FirstName =clientDetails.FirstName ,
                LastName =clientDetails.LastName,
                Email = clientDetails.Email,
                PhoneNumber = clientDetails.PhoneNumber,
                Address = clientDetails.Address,
                PostCode = clientDetails.PostCode,
                City = clientDetails.City,
                IsActive = true,
            };
        }
        public async Task<InvoiceClient> AddInvoiceClient(int invoiceId, int clientId)
        {
            InvoiceClient client = new()
            {
                InvoiceId = invoiceId,
                ClientDetailsId = clientId,
                IsActive = true,
            };

            _repository.InvoiceClient.Create(client);
            await _repository.SaveAsync();
            return client;
        }
        private async Task<UserRental> CreateUserRental(string? userId, int rentalId)
        {
            UserRental userRental = new()
            {
                UserAccountId = userId,
                RentalId = rentalId,
                IsActive = true,
            };
            _repository.UserRental.Create(userRental);
            await _repository.SaveAsync();

            return userRental;
        }

        public async Task<bool> CarHaveRentalInThisDate(int CarId,
                DateTime DateStart,
                DateTime DateEnd)
        {

            var result = await _repository.Rentals
                .FindByCondition(x => x.CarId == CarId &&
                    x.IsActive == true &&
                    !((DateStart > x.RentalEnd && DateEnd > x.RentalEnd) ||
                        (DateStart < x.RentalStart && DateEnd < x.RentalStart))
                    , false)
                .ToListAsync();

      
            if (result.IsNullOrEmpty())
            {
                return false;
            }

            return true;
        }

        public async Task<bool> IsAvailable(NewRentalForClient newRental)
        {
            if(newRental.DateFrom > newRental.DateTo)
            {
                return false;
            }

            var isBusy = await CarIsBusy(newRental);
            return !isBusy;
        }

        private async Task<bool> CarIsBusy(NewRentalForClient newRental)
        {
            var haveRental = await CarHaveRentalInThisDate(newRental.CarId,
                    newRental.DateFrom,
                    newRental.DateTo);

            var haveMaintenance = await CarHaveMaintenanceInThisDate(
                    newRental.CarId,
                    newRental.DateFrom,
                    newRental.DateTo);

            if (haveRental || haveMaintenance)
            {
                await Console.Out.WriteLineAsync("car is busy");
                return true;
            }
            await Console.Out.WriteLineAsync("car is free");

            return false;
        }

        private async Task<bool> CarHaveMaintenanceInThisDate(
                int CarId,
                DateTime DateStart,
                DateTime DateEnd
            )
        {
            var result = await _repository.CarMaintenances
                .FindByCondition(x => x.CarId == CarId &&
                    x.IsActive == true &&
                    !((DateStart > x.DateEnd && DateEnd > x.DateEnd) ||
                        (DateStart < x.DateStart && DateEnd < x.DateStart))
                    , false)
                .ToListAsync();

            if (result.IsNullOrEmpty())
            {
                return false;
            }
            return true;
        }
    }
}
