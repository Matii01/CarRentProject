using CarRent.data.DTO;
using CarRent.Repository.Parameters;
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

        [HttpGet("sendHistory")]
        public async Task<IActionResult> SendHistory([FromQuery] SendHistoryParameters parameters)
        {
            await Console.Out.WriteLineAsync("get history");
            var history = await _services.NewsletterService.GetSendHistoryByParamsAsync(parameters);
            return Ok(history);
        }


        [HttpGet("subscribers")]
        public async Task<IActionResult> GetSubscribers([FromQuery] SubscriberParam parameters)
        {
            await Console.Out.WriteLineAsync("get subscribers");
            var sub = await _services.NewsletterService.GetNewsletterSubscribersByParamsAsync(parameters);
            return Ok(sub);
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
        public async Task<IActionResult> SendNewMessageToNewsletterSubscribers([FromBody] SendHistoryDto newMessage)
        {
            await Console.Out.WriteLineAsync(newMessage.ToString());
            //await _services.NewsletterService.NewSubscription(newSubscription);
            return Ok();
        }
    }
}
