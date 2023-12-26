using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class PaymentController : ControllerBase
    {
        private const string WhSecret = "whsec_61de8ec88cb683302205c12bc3749d33dbf237cd2429bb4c3a721ecb879953f5";
        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService) 
            : base()
        {
            _paymentService = paymentService;
        }

       //[Authorize(Roles = "User")]
        [HttpPost("NewPayment")]
        public async Task<IActionResult> CreateCharge([FromBody] object allRentalData)
        {
            var intent = await _paymentService.CreatePayment();

            return Ok(new { ClientSecret = intent.ClientSecret });
        }

        [HttpPost("webhook")]
        public async Task<IActionResult> StripeWebhook()
        {
            var json = await new StreamReader(Request.Body).ReadToEndAsync();

            var stripeEvent = EventUtility.ConstructEvent(json,
                Request.Headers["Stripe-Signature"], WhSecret);

            PaymentIntent intent;
            switch (stripeEvent.Type) 
            {
                case "payment_intent.succeeded":
                    //await _services.RentalService.CreateRentalAndInvoiceAndAssignUser();
                    break;

                case "payment_intent.payment_failed":
                    break;
            }

            return new EmptyResult();
        }
    }
}
