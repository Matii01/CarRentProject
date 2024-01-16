using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Interfaces;
using CarRent.Repository.Parameters;
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

        public async Task<PagedList<RentalListDataDto>> GetRentalsListAsync(RentalParameters param, bool tractChanges)
        {
            var list = await _repository.Rentals.GetPagedListRentalActiveAsync(param, tractChanges);
            return list;
        }

        public async Task<PagedList<InvoiceDto>> GetRentalsListAsync(OrderParameters param, bool tractChanges)
        {
            var list = await _repository.Rentals.GetInvoicesDataAsync(param, tractChanges);
            return list;
        }

        public async Task<IEnumerable<UserRentalListDto>> GetUserRentalsAsync(string userId)
        {
            var list = await _repository.Rentals.GetUserRentalsAsync(userId);
            return list;
        }

        public async Task<UserRentalDetailDto> GetUserRentalDetailAsync(string userId, int id)
        {
            var item = await _repository.Rentals
                .GetUserRentalDetailAsync(userId, id);

            return item;
        }

        public async Task<NewInvoiceDto> GetInvoiceRentalDetailsAsync(int id)
        {
            var invoiceId = await _repository.Rentals.GetInvoiceIdByRentalId(id);
            var invoice = await _repository.Rentals.GetInvoiceDataAsync(invoiceId);


            return invoice;
        }
        
        public async Task<NewInvoiceDto> GetDataForGenerateInvoice(int id)
        {
            var data = await GetInvoiceRentalDetailsAsync(id);
            return data;
        }

        public async Task<IEnumerable<RentalDatesDto>> GetFutureRentalDatesForCarAsync(int CarId)
        {
            return await _repository.Rentals
                .GetRentalForCar(CarId)
                .Select(x => new RentalDatesDto(x.RentalStart, x.RentalEnd))
                .ToListAsync();
        }

        public async Task<InvoiceDto> GetRentalInfoByPaymentIdAsync(string paymentId)
        {
            return await _repository.Rentals.GetRentalInfoByPaymentId(paymentId);
        }

        public async Task<IEnumerable<int>> GetCarsThatHaveRentalInDates(NewRentalForClient dates)
        {
            var list = await _repository.Rentals.FindByCondition(x => x.IsActive == true &&
                    !((dates.DateFrom > x.RentalEnd && dates.DateTo > x.RentalEnd) ||
                        (dates.DateFrom < x.RentalStart && dates.DateTo < x.RentalStart)), false)
                .Select(x => x.CarId)
                .ToListAsync();

            return list;
        }

        public async Task UpdateRentalStatusAsync(int rentalId, UpdateRentalStatusDto newStatus)
        {
            var toUpdate = await _repository.Rentals
                .GetAsync(rentalId, true)
                .SingleOrDefaultAsync() ?? throw new Exception("Not found");

            toUpdate.RentalStatusId = newStatus.NewStatus;
            await _repository.SaveAsync();
        }

        public async Task UpdateInvoiceStatusAsync(int rentalId, UpdateInvoiceStatusDto newStatus)
        {
            var toUpdate = await _repository.Invoice
                .GetAsync(rentalId, true)
                .SingleOrDefaultAsync() ?? throw new Exception("Not found");

            toUpdate.InvoiceStatus = newStatus.NewStatus;
            await _repository.SaveAsync();
        }

        public async Task<RentalDataForClientDto> CreateRentalAndInvoiceAndAssignUser(string userId,
            string? paymentIntent,
                InvoiceDto invoiceDto,
                NewRentalForClient newRental,
                ClientDetailsDto clientDetails)
        {
            if (await CarIsBusy(newRental))
            {
                throw new Exception("Car have rental on this time");
            }
            var price = await _priceList.GetPriceForCarForDate(userId, newRental);

            string invoiceNumber = await GenerateInvoiceNumber();
            var Invoice = new Invoice 
            { 
                Number = invoiceNumber, 
                Comment = invoiceDto.Comment, 
                PaymentIntentId = paymentIntent,
                IsActive = true, 
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
                }
            };

            _repository.Invoice.Create(Invoice);
            await _repository.SaveAsync();


            var Rental = await CreateRental(newRental);
            Rental.InvoiceItem = new InvoiceItem
            {
                Rabat = price.Rabat,
                Net = price.Net,
                Gross = price.Gross,
                PaidAmount = price.Gross,
                VAT = price.VAT,
                VATValue = price.VATValue,
                InvoiceId = Invoice.Id,
                RentalId = Rental.Id,
                IsActive = true,
            };

            _repository.Rentals.Create(Rental);
            await _repository.SaveAsync();
            await CreateUserRentalAsync(userId, Rental.Id);
            await CreateUserInvoiceAsync(userId, Invoice.Id);
            
            var carName = await _repository.Car.GetCarAsync(newRental.CarId, false);
            var rentalInfo = new RentalDataForClientDto(
                    clientDetails.FirstName + " " + clientDetails.LastName,
                    newRental.DateFrom,
                    newRental.DateTo,
                    carName.Name,
                    carName.CarImage,
                    Rental.InvoiceItem.Gross
                    ); 

            return rentalInfo;
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

        public async Task<bool> CarHaveRentalInThisDate(int CarId, DateTime DateStart, DateTime DateEnd)
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

        public async Task ChangeRentedCarAsync(ChangeRentedCar newCar)
        {
            var rental = await _repository.Rentals
                .GetAsync(newCar.RentalId, true)
                .SingleOrDefaultAsync() ?? throw new Exception("can not find rental");

            if (!await IsAvailable(new NewRentalForClient(newCar.NewCarId, rental.RentalStart, rental.RentalEnd)))
            {
                throw new Exception("car is not free");
            }

            rental.CarId = newCar.NewCarId;
            await _repository.SaveAsync();
        }

        private async Task<Rental> CreateRental(NewRentalForClient newRental)
        {
            var RentalStatusId = await GetDefaultRentalStatus();
            Rental rental = new()
            {
                CarId = newRental.CarId,
                RentalStart = newRental.DateFrom,
                RentalEnd = newRental.DateTo,
                IsActive = true,
                RentalStatusId = RentalStatusId,
            };
            return rental;
        }

        private async Task<UserRental> CreateUserRentalAsync(string? userId, int rentalId)
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

        private async Task<UserInvoice> CreateUserInvoiceAsync(string? userId, int invoiceId)
        {
            UserInvoice invoiceClient = new()
            {
                UserAccountId = userId,
                InvoiceId = invoiceId,
                IsActive = true,
            };
            _repository.UserInvoice.Create(invoiceClient);
            await _repository.SaveAsync();
            return invoiceClient;
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

        private async Task<bool> CarHaveMaintenanceInThisDate( int CarId, DateTime DateStart,DateTime DateEnd)
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

        private async Task<int?> GetDefaultRentalStatus()
        {
            var result = await _repository.RentalStatus
                .FindByCondition(x => x.IsDefault == true && x.IsActive == true, false)
                .SingleOrDefaultAsync();

            if(result == null)
            {
                return null;
            }
            return result.Id;
        }

        private async Task<string> GetInvoiceNumber()
        {
            string number = "NR/12";
            return number;
        }

        private async Task<string> GenerateInvoiceNumber()
        {
            var lastInvoiceNumber = await _repository.Invoice
                .FindByCondition(x => x.IsActive == true, false)
                .OrderBy(x => x.Id)
                .Select(x=> x.Number)
                .LastOrDefaultAsync();

            if(lastInvoiceNumber == null)
            {
                return "NR/1";
            }

            var invoice = lastInvoiceNumber.Split('/');

            try
            {
                int num = Int32.Parse(invoice[^1]);
                int next = num + 1;
                
                StringBuilder newInvoiceNum = new ("");
                for(int i = 0; i < invoice.Length-1; i++)
                {
                    newInvoiceNum.Append(invoice[i]);
                    newInvoiceNum.Append('/');
                }
                newInvoiceNum.Append(next);
                return newInvoiceNum.ToString();
            }
            catch (Exception ex)
            {
                return "NR/1";
            }
        }
    }
}
