using AutoMapper;
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
    public class PaymentService :  IPaymentService
    {
        private readonly IConfiguration _config;

        public PaymentService(IConfiguration config) 
        {
            _config = config;
        }

        public async Task<PaymentIntent> CreatePayment()
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
            return paymentIntent;
        }
    }
}
