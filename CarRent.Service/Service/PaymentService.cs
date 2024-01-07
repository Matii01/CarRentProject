using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using CarRent.data.Models.User;
using CarRent.Repository.Interfaces;
using CarRent.Repository.Migrations;
using CarRent.SendingEmail;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        public PaymentService(IRepositoryManager repository, IMapper mapper, IConfiguration config, IPriceListService priceList, IRentalService rental, IEmailSender emailSender) : base(repository, mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
            _config = config;
            _priceList = priceList;
            _rental = rental;
            _emailSender = emailSender;
        }

        public async Task<PaymentIntent> CreatePayment(string? userId, string? dataForRental)
        {
            StripeConfiguration.ApiKey = _config["Stripe:SecretKey"];
            await Console.Out.WriteLineAsync(StripeConfiguration.ApiKey);

            var allRentalData = JsonConvert.DeserializeObject<AllRentalDataDto>(dataForRental);
            var price = await _priceList.GetPriceForCarForDate(userId, allRentalData.NewRentalForClient);

            var service = new PaymentIntentService();
            var options = new PaymentIntentCreateOptions
            {
                Amount = (long)price.Gross * 100,
                Currency = "pln",
                PaymentMethodTypes = new List<string> { "card"}
            };
            var paymentIntent = await service.CreateAsync(options);
            await SaveRentalData(userId, dataForRental, paymentIntent.Id);

            return paymentIntent;
        }

        public async Task UpdatePaymentSucceeded(string intentId)
        {
            Console.WriteLine("PAYMENT SUCCEEDED !!!!!!!!!!!!!!");

            var rentalData = await _repository.DataForRental
                .FindByCondition(x => x.PaymentIntentId == intentId, false)
                .SingleOrDefaultAsync() ?? throw new Exception("");

            var allRentalData = JsonConvert.DeserializeObject<AllRentalDataDto>(rentalData.RentalData);

            var result = await _rental.CreateRentalAndInvoiceAndAssignUser
                (rentalData.UserId,
                rentalData.PaymentIntentId,
                    allRentalData.Invoice,
                    allRentalData.NewRentalForClient,
                    allRentalData.ClientDetails);

            _emailSender.SendEmailPaymentSucceeded(
                allRentalData.ClientDetails,
                allRentalData.NewRentalForClient,
                allRentalData.Invoice.InvoiceItems);
            
        }

        public Task UpdatePaymentFailed(string intentId)
        {
            //throw new NotImplementedException();
            Console.WriteLine("PAYMENT FAILED ");
            return Task.CompletedTask;
        }
        private async Task SaveRentalData(string? userId, string? dataForRental, string paymentIntentId)
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
