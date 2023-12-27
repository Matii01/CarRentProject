using AutoMapper;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Interfaces;
using CarRent.Service.Interfaces;
using Microsoft.Extensions.Configuration;
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
        private readonly IConfiguration _config;

        public PaymentService(IRepositoryManager repository, IMapper mapper, IConfiguration config) : base(repository, mapper)
        {
            _config = config;
        }

        public async Task<PaymentIntent> CreatePayment(string? dataForRental)
        {
            //var service = new ChargeService();
            StripeConfiguration.ApiKey = _config["Stripe:SecretKey"];
            await Console.Out.WriteLineAsync(StripeConfiguration.ApiKey);

            var service = new PaymentIntentService();
            var options = new PaymentIntentCreateOptions
            {
                Amount = 200,
                Currency = "pln",
                PaymentMethodTypes = new List<string> { "card"}
            };
            var paymentIntent = await service.CreateAsync(options);
            await SaveRentalData(dataForRental, paymentIntent.Id);
            return paymentIntent;
        }

        public Task UpdatePaymentSucceeded(string intentId)
        {
            Console.WriteLine("PAYMENT SUCCEEDED !!!!!!!!!!!!!!");
            return Task.CompletedTask;
        }

        public Task UpdatePaymentFailed(string intentId)
        {
            //throw new NotImplementedException();
            Console.WriteLine("PAYMENT FAILED ");
            return Task.CompletedTask;
        }
        private async Task SaveRentalData(string? dataForRental, string paymentIntentId)
        {
            if (dataForRental == null)
            {
                throw new Exception("data for rental null");
            }

            var data = new DataForRental
            {
                RentalData = dataForRental,
                PaymentIntentId = paymentIntentId
            };

            _repository.DataForRental.Create(data);
            await _repository.SaveAsync();
        }
    }
}
