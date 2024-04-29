using CarRent.data.DTO;
using CarRent.data.Models.User;
using CarRent.Repository.Parameters;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class MessagesController : BaseController
    {
        private readonly UserManager<User> _userManager;
        public MessagesController(IServiceManager serviceManager, UserManager<User> userManager)
            : base(serviceManager)
        {
            _userManager = userManager;
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
            var username = User.Identity.Name;
            var user = await _userManager.FindByNameAsync(username);
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
