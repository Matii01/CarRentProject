using CarRent.data.DTO;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class NewsletterController : BaseController
    {
        public NewsletterController(IServiceManager serviceManager) 
            : base(serviceManager)
        {
        }

        [HttpPost("subscribe")]
        public async Task<IActionResult> SubscribeToNewLetter([FromBody]string newSubscription)
        {
            //await Console.Out.WriteLineAsync(newSubscription);
            await _services.NewsletterService.NewSubscription(newSubscription);
            return Ok();
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("sendNewMessage")]
        public async Task<IActionResult> SendNewMessageToNewsletterSubscribers([FromBody] NewSubscriptionDto newSubscription)
        {
            //await _services.NewsletterService.NewSubscription(newSubscription);
            return Ok();
        }
    }
}
