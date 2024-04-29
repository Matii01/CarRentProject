using CarRent.data.Configurations;
using CarRent.data.Models.User;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace CarRent.api.Controllers
{
    public class PaymentController : BaseController
    {
        private readonly WhSecretConfiguration _secretConfig;
        private readonly UserManager<User> _userManager;

        public PaymentController(IServiceManager serviceManager, UserManager<User> userManager, WhSecretConfiguration secretConfig) 
            : base(serviceManager)
        {
            _userManager = userManager;
            _secretConfig = secretConfig;
        }

        [Authorize(Roles = "User")]
        [HttpPost("NewPayment")]
        public async Task<IActionResult> CreateCharge([FromBody] object allRentalData)
        {
            var username = User.Identity.Name;
            var user = await _userManager.FindByNameAsync(username);


            var intent = await _services.PaymentService.CreatePayment(user.Id, allRentalData.ToString());

            return Ok(new { ClientSecret = intent.ClientSecret });
        }

        [HttpPost("webhook")]
        public async Task<IActionResult> StripeWebhook()
        {
            var json = await new StreamReader(Request.Body).ReadToEndAsync();

            var stripeEvent = EventUtility.ConstructEvent(json,
                Request.Headers["Stripe-Signature"], _secretConfig.WhSecret);

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
