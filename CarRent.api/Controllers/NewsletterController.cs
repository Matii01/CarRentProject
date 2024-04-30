using CarRent.data.DTO;
using CarRent.Repository.Parameters;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
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
            await _services.NewsletterService.NewSubscription(newSubscription);
            return Ok();
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("sendNewMessage")]
        public async Task<IActionResult> SendNewMessageToNewsletterSubscribers([FromBody] SendHistoryDto newMessage)
        {
            await Console.Out.WriteLineAsync(newMessage.ToString());
            await _services.NewsletterService.SendNewMessage(newMessage);
            return Ok();
        }
        

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("Unsubscribe/{id:int}")]
        public async Task<IActionResult> UnsubscribeNewsletter(int id)
        {
            await _services.NewsletterService.UnsubscribeNewsletter(id);
            return Ok("");
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("RenewSubscribe/{id:int}")]
        public async Task<IActionResult> RenewSubscribe(int id)
        {
            await _services.NewsletterService.RenewSubscribe(id);
            return Ok("");
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpDelete("deleteHistory/{id:int}")]
        public async Task<IActionResult> DeleteFromHistory(int id)
        {
            await _services.NewsletterService.DeleteFromHistory(id);
            return Ok("");
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpDelete("deleteSub/{id:int}")]
        public async Task<IActionResult> DeleteFromNewsletterSub(int id)
        {
            await _services.NewsletterService.DeleteFromNewsletterSub(id);
            return Ok("");
        }
    }
}
