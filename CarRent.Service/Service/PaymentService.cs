using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Exceptions;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Interfaces;
using CarRent.SendingEmail;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Stripe;

namespace CarRent.Service.Service
{
    public class PaymentService : ServiceBase, IPaymentService
    {
        private readonly IRepositoryManager repository;
        private readonly IMapper mapper;
        private readonly IConfiguration _config;
        private readonly IPriceListService _priceList;
        private readonly IRentalService _rental;
        private readonly IEmailSender _emailSender;
        private readonly INotificationService _notification;

        public PaymentService(IRepositoryManager repository, IMapper mapper, IConfiguration config, IPriceListService priceList, IRentalService rental, IEmailSender emailSender, INotificationService notification) 
            : base(repository, mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
            _config = config;
            _priceList = priceList;
            _rental = rental;
            _emailSender = emailSender;
            _notification = notification;
        }

        public async Task<PaymentIntent?> CreatePayment(string userId, string dataForRental)
        {
            var allRentalData = JsonConvert.DeserializeObject<AllRentalDataDto>(dataForRental);
            if(allRentalData == null || allRentalData.NewRentalForClient == null)
            {
                return null;
            }

            StripeConfiguration.ApiKey = _config["Stripe:SecretKey"];

            var price = await _priceList.GetPriceForCarForDate(userId, allRentalData.NewRentalForClient);

            var service = new PaymentIntentService();
            var options = new PaymentIntentCreateOptions
            {
                Amount = (long)price.Gross * 100,
                Currency = "pln",
                PaymentMethodTypes = new List<string> { "card" }
            };
            var paymentIntent = await service.CreateAsync(options);
            await SaveRentalData(userId, dataForRental, paymentIntent.Id);

            return paymentIntent;
        }

        public async Task UpdatePaymentSucceeded(string intentId)
        {
            var rentalData = await _repository.DataForRental
                .FindByCondition(x => x.PaymentIntentId == intentId, false)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("");

            var rentalDetails = JsonConvert.DeserializeObject<AllRentalDataDto>(rentalData.RentalData);

            var result = await _rental.CreateRentalAndAssignUser (
                    rentalData.UserId,
                    rentalData.PaymentIntentId,
                    rentalDetails.Invoice,
                    rentalDetails.NewRentalForClient,
                    rentalDetails.ClientDetails
                );

            if (result == true)
            {
                _emailSender.SendEmailPaymentSucceeded(
                    rentalDetails.ClientDetails,
                    rentalDetails.NewRentalForClient,
                    rentalDetails.Invoice.InvoiceItems
                );

                await _notification.SendAddedRentalNotificationAsync(rentalData.UserId, rentalDetails.NewRentalForClient);
            }
        }

        public Task UpdatePaymentFailed(string intentId)
        {
            //throw new NotImplementedException();
            Console.WriteLine("PAYMENT FAILED ");
            return Task.CompletedTask;
        }

        private async Task SaveRentalData(string userId, string? dataForRental, string paymentIntentId)
        {
            if (dataForRental == null)
            {
                throw new Exception("data for rental null");
            }

            var data = new DataForRental
            {
                UserId = userId,
                RentalData = dataForRental,
                PaymentIntentId = paymentIntentId
            };

            _repository.DataForRental.Create(data);
            await _repository.SaveAsync();
        }
    }
}
