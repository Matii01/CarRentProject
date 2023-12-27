using CarRent.data.DTO;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Stripe;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class PaymentController : BaseController
    {
        private const string WhSecret = "whsec_61de8ec88cb683302205c12bc3749d33dbf237cd2429bb4c3a721ecb879953f5";

        public PaymentController(IServiceManager serviceManager) 
            : base(serviceManager)
        {
        }

        //[Authorize(Roles = "User")]
        [HttpPost("NewPayment")]
        public async Task<IActionResult> CreateCharge([FromBody] object allRentalData)
        {

            var intent = await _services.PaymentService.CreatePayment(allRentalData.ToString());

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
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    await _services.PaymentService.UpdatePaymentSucceeded(intent.Id);
                    break;

                case "payment_intent.payment_failed":
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    await _services.PaymentService.UpdatePaymentFailed(intent.Id);
                    break;
            }

            return new EmptyResult();
        }
    }
}
