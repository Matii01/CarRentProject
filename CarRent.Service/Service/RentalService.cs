using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Exceptions;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Interfaces;
using CarRent.Repository.Parameters;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace CarRent.Service.Service
{
    public class RentalService : ServiceBase, IRentalService
    {
        private readonly IPriceListService _priceList;
        private readonly INotificationService _notification;

        public RentalService(
            IRepositoryManager repository,
            IPriceListService priceList,
            IMapper mapper,
            INotificationService notification
            ) 
            : base(repository, mapper)
        {
           _priceList = priceList;
           _notification = notification;
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

        public async Task<PagedList<UserRentalListDto>> GetUserRentalsAsync(OrderParameters param)
        {
            var list = await _repository.Rentals.GetUserRentalsAsync(param);
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
            return await GetInvoiceDataAsync(invoiceId);
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
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("Not found");

            toUpdate.RentalStatusId = newStatus.NewStatus;
            await _repository.SaveAsync();
            await SendUpdateRentalStatusNotification(rentalId, newStatus);
        }

        public async Task UpdateInvoiceAsync(int invoiceId, UpdateInvoiceDto newStatus)
        {
            var toUpdate = await _repository.Invoice
                .GetAsync(invoiceId, true)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("Not found");

            if(toUpdate.IsEditable == true && newStatus.Paid <= toUpdate.TotalToPay)
            {
                toUpdate.TotalPaid = newStatus.Paid;
            }

            toUpdate.InvoiceStatus = newStatus.NewStatus;
            await _repository.SaveAsync();

            await SendUpdateInvoiceStatusNotification(invoiceId, newStatus);
        }

        public async Task<bool> CreateRentalAndAssignUser(
                string userId,
                string? paymentIntent,
                InvoiceDto invoiceDto,
                NewRentalForClient newRental,
                ClientDetailsDto clientDetails)
        {
            if (await CarIsBusy(newRental))
            {
                throw new DataNotFoundException("Car have rental on this time");
            }

            var price = await _priceList.GetPriceForCarForDate(userId, newRental);
            string invoiceNumber = await GenerateInvoiceNumber();
            var defaultRentalStatusId = await GetDefaultRentalStatus();

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
                    InvoiceStatus = GetInvoiceStatusForPaidInvoice(),
                    TotalPaid = price.Gross,
                    TotalToPay = price.Gross,
                    CreatedDate = DateTime.Now,
                    PaymentDate = DateTime.Now,
                    IsEditable = false,
                    Client = GetIndividualClient(clientDetails),
                    InvoicesItems = new List<InvoiceItem>()
                    {
                        new ()
                        {
                            Rabat = price.Rabat,
                            Net = price.Net,
                            Gross = price.Gross,
                            PaidAmount = price.Gross,
                            VAT = price.VAT,
                            VATValue = price.VATValue,
                            IsActive = true,
                            Rental = new Rental()
                            {
                                CarId = newRental.CarId,
                                RentalStart = newRental.DateFrom,
                                RentalEnd = newRental.DateTo,
                                RentalStatusId = defaultRentalStatusId,
                                IsActive = true,
                            }
                        }
                    }
                }
            };

            _repository.UserInvoice.Create(userInvoice);
            await _repository.SaveAsync();
            var rentalId = userInvoice.Invoice.InvoicesItems.FirstOrDefault()?.RentalId;
            if(rentalId != null)
            {
                await CreateUserRentalAsync(userId, (int)rentalId);
            }

            return true;
        }
 
        public async Task CreateRentalsAndInvoice(NewRentalFromWorker data)
        {
            await Console.Out.WriteLineAsync("New invoice will be added");
            await CreateRentalsAndInvoiceWithIndividual(data);
        }

        private async Task CreateRentalsAndInvoiceWithIndividual(NewRentalFromWorker data)
        {
            var DefaultRentalStatusId = await GetDefaultRentalStatus();
            string invoiceNumber = await GenerateInvoiceNumber();

            List<InvoiceAndRentalDto> InvoiceItems = await GenerateInvoiceItemsList(data.Rentals);
            var totalGross = InvoiceItems.Sum(x => x.Gross);

            var NewInvoice = new Invoice
            {
                Number = invoiceNumber,
                Comment = "",
                IsActive = true,
                TotalPaid = data?.Invoice?.Paid ?? 0,
                TotalToPay = totalGross,
                IsEditable = totalGross != (data?.Invoice?.Paid ?? 0),
                CreatedDate = DateTime.Now,
                PaymentDate = data?.Invoice?.PaymentTerm,
                InvoiceStatus = GetInvoiceStatusForPaidInvoice(),
                Client = GetClientToInvoice(data), 
                InvoicesItems = InvoiceItems
                    .Select(x => new InvoiceItem()
                    {
                        Rabat = x.Rabat,
                        Net = x.Net,
                        Gross = x.Gross,
                        PaidAmount = x.PaidAmount,
                        VAT = x.VAT,
                        VATValue = x.VATValue,
                        Rental = new Rental()
                        {
                            CarId = x.CarId,
                            RentalStart = x.DateFrom,
                            RentalEnd = x.DateTo,
                            RentalStatusId = DefaultRentalStatusId,
                            IsActive = true,
                        },
                        IsActive = true,
                    }).ToList()
            };

            _repository.Invoice.Create(NewInvoice);
            await _repository.SaveAsync();
        }

        private static Client GetClientToInvoice(NewRentalFromWorker? data)
        {
            if (data != null && data.ClientDetails != null)
            {
                return GetIndividualClient(data.ClientDetails);
            }
            if (data != null && data.FirmClientDto != null)
            {
                return GetFirmClient(data.FirmClientDto);
            }

            throw new DataNotFoundException("No client data");
        }

        private static IndividualClient GetIndividualClient(ClientDetailsDto clientDetails)
        {
            var Client = new IndividualClient
            {
                FirstName = clientDetails.FirstName,
                LastName = clientDetails.LastName,
                Email = clientDetails.Email,
                PhoneNumber = clientDetails.PhoneNumber,
                Address = clientDetails.Address,
                PostCode = clientDetails.PostCode,
                City = clientDetails.City,
                IsActive = true,
            };
            return Client;
        }

        private static FirmClient GetFirmClient(FirmClientDto firmClient)
        {
            var Client = new FirmClient
            {
                NIP = firmClient.NIP,
                CompanyName = firmClient.CompanyName,
                StreetAndNumber = firmClient.StreetAndNumber,
                PostCode = firmClient.PostCode,
                City = firmClient.City,
                IsActive = true,
            };
            return Client;
        }

        private async Task<List<InvoiceAndRentalDto>> GenerateInvoiceItemsList(NewRentalForClient[] rentals)
        {
            List<InvoiceAndRentalDto> items = new(); 
            foreach (var x in rentals)
            {
                var price = await _priceList.GetPriceForCarForDate(null, new NewRentalForClient(x.CarId, x.DateFrom, x.DateTo));
                items.Add(new InvoiceAndRentalDto(
                        0,
                        price.Rabat,
                        price.Net,
                        price.Gross,
                        0,
                        price.VAT,
                        price.VATValue, 
                        x.CarId,
                        x.DateFrom,
                        x.DateTo
                    ));
            }

            return items;
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
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("can not find rental");

            if (!await IsAvailable(new NewRentalForClient(newCar.NewCarId, rental.RentalStart, rental.RentalEnd)))
            {
                throw new DataNotFoundException("car is not free");
            }

            rental.CarId = newCar.NewCarId;
            await _repository.SaveAsync();
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
            catch (Exception )
            {
                return "NR/1";
            }
        }

        private static int GetInvoiceStatusForPaidInvoice()
        {
            return 2;
        }

        private async Task<string> GetInvoiceStatusNameById(int id)
        {
            var name = await _repository.InvoiceStatus
                .GetAsync(id, false)
                .Select(x => x.Name)
                .SingleOrDefaultAsync();

            return name ?? "";
        }

        private async Task<string> GetRentalStatusNameById(int id)
        {
            var name = await _repository.RentalStatus
                .GetAsync(id, false)
                .Select(x => x.Status)
                .SingleOrDefaultAsync();

            return name ?? "";
        }

        private async Task SendUpdateRentalStatusNotification(int rentalId, UpdateRentalStatusDto newStatus)
        {
            string? UserId = await _repository.UserRental
                    .GetAsync(rentalId, false)
                    .Select(x => x.UserAccountId)
                    .SingleOrDefaultAsync();

            if (UserId != null)
            {
                var old = await GetRentalStatusNameById(newStatus.OldStatus);
                var newSt = await GetRentalStatusNameById(newStatus.NewStatus);
                await _notification.SendUpdateRentalStatusNotificationAsync(UserId, old, newSt);
            }
        }

        private async Task SendUpdateInvoiceStatusNotification(int invoiceId, UpdateInvoiceDto item)
        {
            string? UserId = await GetUserIdFromInvoiceNr(invoiceId);

            if (UserId != null) 
            {
                var old = await GetInvoiceStatusNameById(item.OldStatus);
                var newSt = await GetInvoiceStatusNameById(item.NewStatus);
                await _notification.SendUpdateInvoiceStatusNotificationAsync(UserId, old, newSt);
            }
        }

        private async Task<string?> GetUserIdFromInvoiceNr(int invoiceId)
        {
            var rental = await _repository.Invoice
                .GetAsync(invoiceId, false)
                .Select(x => x.InvoicesItems.First().Rental)
                .FirstOrDefaultAsync();

            if (rental is null)
            {
                return null;
            }

            return await _repository.UserRental
                .GetAsync(rental.Id, false)
                .Select(x => x.UserAccountId)
                .SingleOrDefaultAsync();
        }

        private async Task<NewInvoiceDto> GetInvoiceDataAsync(int invoiceId)
        {
            var invoice = await _repository.Invoice.FindByCondition(x => x.Id == invoiceId, false)
                .Where(x => x.Id == invoiceId)
                .Include(x => x.Client)
                .Include(x => x.InvoicesItems)
                .ThenInclude(x => x.Rental)
                .ThenInclude(x => x.Car)
                .ThenInclude(x => x.CarMake)
                .Select(x => new InvoiceWithClient(
                        x.Id,
                        x.InvoiceStatus,
                        x.Number,
                        x.Comment,
                        x.TotalToPay,
                        x.TotalPaid,
                        x.IsEditable,
                        x.CreatedDate,
                        x.PaymentDate,
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
                                y.Rental.Car.CarImage ?? "",
                                y.Rental.Car.CarMake.Name,
                                y.Rental.RentalStart,
                                y.Rental.RentalEnd,
                                y.Rental.RentalStatus == null ? "" : y.Rental.RentalStatus.Status,
                                y.Rental.RentalStatusId
                                ))
                        ).ToList()
                    )).SingleOrDefaultAsync() ?? throw new DataNotFoundException("Invoice not found");

            return TransformInvoiceClient(invoice);
        }

        private NewInvoiceDto TransformInvoiceClient(InvoiceWithClient invoice)
        {
            if (invoice.Client is IndividualClient)
            {
                var newInvoice = new NewInvoiceDto(true, null, _mapper.Map<InvoiceWithIndividualClient>(invoice));
                return newInvoice;
            }
            else
            {
                var client = invoice.Client as FirmClient;
                var firmClient = _mapper.Map<InvoiceWithFirmClient>(invoice);
                firmClient.Client = _mapper.Map<FirmClientDto>(client);
                
                var newInvoice = new NewInvoiceDto(true, firmClient, null);
                return newInvoice;
            }
        }
    }
}

