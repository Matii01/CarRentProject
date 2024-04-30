using CarRent.data.DTO;
using CarRent.Repository.Parameters;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    public class MessagesController : BaseController
    {
        private readonly IAuthenticationService _authentication;

        public MessagesController(IServiceManager serviceManager, IAuthenticationService authentication)
            : base(serviceManager)
        {
            _authentication = authentication;
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpGet("getMessages")]
        public async Task<IActionResult> GetMessagesByParams([FromQuery]MessagesParameters parameters)
        {
            var messages = await _services.MessagesService.GetMessagesAsync(parameters);
            return Ok(messages);
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("AnswerMessage/{id:int}")]
        public async Task<IActionResult> AnswerForMessage(int id, [FromBody] MessageAnswerDto answerDto)
        {
            var user = await _authentication.GetUserByClaims(User);
            var name = user.FirstName + " " + user.LastName;

            var item = await _services.MessagesService
                .AnswerToMessage(id, user.Id, name, answerDto);

            return Ok(item);
        }

        [HttpPost("sendMessage")]
        public async Task<IActionResult> SendNewMessage([FromBody] NewMessageDto newMessage)
        {
            await _services.MessagesService.AddNewMessage(newMessage);
            return Ok(newMessage);
        }
    }
}
