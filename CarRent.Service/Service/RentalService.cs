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
        private readonly ICarMaintenanceService _carMaintenance;

        public RentalService(
            IRepositoryManager repository,
            IPriceListService priceList,
            ICarMaintenanceService carMaintenance,
            IMapper mapper) 
            : base(repository, mapper)
        {
           _priceList = priceList;
           _carMaintenance = carMaintenance;
        }

        public async Task<string> CreateRentalAndInvoiceAndAssignUser(string userId,
                InvoiceDto invoiceDto,
                NewRentalForClient newRental,
                ClientDetailsDto clientDetails)
        {
            if (await CarIsBusy(newRental))
            {
                throw new Exception("Car have rental in this time");
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

            _repository.Rental.Create(Rental);
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

        public async Task<bool> CarHaveRentalInThisDate(NewRentalForClient rental)
        {
            var result = await _repository.Rental.FindByCondition(
                x => x.CarId == rental.CarId && 
                x.IsActive == true &&
                !((rental.DateFrom > x.RentalEnd && rental.DateTo > x.RentalEnd) ||
                        (rental.DateFrom < x.RentalStart && rental.DateTo < x.RentalStart))
                , false)
                .ToListAsync();

            if (result.IsNullOrEmpty())
            {
                return false;
            }

            return true;
        }

        private async Task<bool> CarIsBusy(NewRentalForClient newRental)
        {
            if (await CarHaveRentalInThisDate(newRental) || 
                await _carMaintenance.CarHaveMaintenanceInThisDate(
                    newRental.CarId, 
                    newRental.DateFrom, 
                    newRental.DateTo)
                )
            {
                return true;
            }
            return false;
        }
    }
}
