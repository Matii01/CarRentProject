using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface IPaymentService
    {
        Task<PaymentIntent?> CreatePayment(string userId, string dataForRental);
        Task UpdatePaymentSucceeded(string intentId);
        Task UpdatePaymentFailed(string intentId);
    } 
}
