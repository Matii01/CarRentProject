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
    public class RentalService : ServiceBase, IRentalService
    {
        public RentalService(IRepositoryManager repository, IMapper mapper) 
            : base(repository, mapper)
        {

        }

        /// <summary>
        /// Create Invoice 
        /// </summary>
        /// <param name="invoiceDto"></param>
        /// <param name="newRental"></param>
        /// <param name="price"></param>
        /// <returns></returns>
        public async Task<Rental> CreateInvoiceAndAddRental(
            string? UserId,
            InvoiceDto invoiceDto, 
            NewRentalForClient newRental, 
            PriceForCar price)
        {
            var invoice = await CreateInvoiceAsync(invoiceDto);
            var rental =  CreateRentalForClientAsync(newRental, price);
            var InvoiceItem = CreateInvoiceItem(invoice.Id, rental.Id, price);

            rental.InvoiceItem = InvoiceItem;
            
            _repository.Rental.Create(rental);
            await _repository.SaveAsync();

            await CreateUserRental(UserId, rental.Id);
            return rental;
        }

        public async Task<InvoiceClient> AddInvoiceClient(int invoiceId, int clientId)
        {
            InvoiceClient client = new()
            {
                InvoiceId = invoiceId,
                ClientDetailsId = clientId
            };

            _repository.InvoiceClient.Create(client);
            await _repository.SaveAsync();
            return client;
        }

        private Rental CreateRentalForClientAsync(NewRentalForClient newRental, PriceForCar price) 
        {
            Rental rental = new()
            {
                CarId = newRental.CarId,
                RentalStart = newRental.DateFrom,
                RentalEnd = newRental.DateTo,
            };
            return rental;
        }

        private async Task<UserRental> CreateUserRental(string? userId, int rentalId)
        {
            UserRental userRental = new()
            {
                UserAccountId = userId,
                RentalId = rentalId
            };
            _repository.UserRental.Create(userRental);
            await _repository.SaveAsync();

            return userRental;
        }

        private InvoiceItem CreateInvoiceItem(int invoiceId, int rentalId, PriceForCar price)
        {
            InvoiceItem invoiceItem = new()
            {
                Rabat = price.Rabat,
                Net = price.Net,
                Gross = price.Gross,
                VAT = price.VAT,
                VATValue = price.VATValue,
                InvoiceId = invoiceId,
            };
            return invoiceItem;
        }

        private async Task<Invoice> CreateInvoiceAsync(InvoiceDto invoiceDto)
        {
            Invoice invoice = new()
            {
                Number = invoiceDto.Number,
                Comment = invoiceDto.Comment,
            };
            _repository.Invoice.Create(invoice);
            await _repository.SaveAsync();
            
            return invoice;
        }
    }
}
