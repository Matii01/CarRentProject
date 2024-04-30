using CarRent.data.DTO;
using CarRent.Repository.Parameters;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    public class NotificationController : BaseController
    {
        private readonly IAuthenticationService _authentication;

        public NotificationController(IServiceManager serviceManager, IAuthenticationService authentication)
            : base(serviceManager)
        {
            _authentication = authentication;
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpGet("all")]
        public async Task<IActionResult> GetNotifications([FromQuery] NotificationParameters param)
        {
            var list = await _services.NotificationService.GetNotificationsByParamsAsync(param);
            return Ok(list);
        }

        [Authorize(Roles = "User")]
        [HttpGet("myNotification")]
        public async Task<IActionResult> GetUserNotifications([FromQuery] NotificationParameters param)
        {
            var userId = await _authentication.GetUserIdByClaims(User);
            param.UserId = userId;

            var list = await _services.NotificationService.GetNotificationsByParamsAsync(param);
            return Ok(list);
        }

        [Authorize(Roles = "User")]
        [HttpGet("myNewNotification")]
        public async Task<IActionResult> GetNewNotificationsCount([FromQuery] NotificationParameters param)
        {
            var userId = await _authentication.GetUserIdByClaims(User);
            param.UserId = userId;

            var count = await _services.NotificationService.GetNotificationsCountAsync(param);
            return Ok(count);
        }

        [Authorize(Roles = "User")]
        [HttpPost("read/{id:int}")]
        public async Task<IActionResult> ReadNotification(int id)
        {
            await _services.NotificationService.ReadNotificationAsync(id);

            return Ok("");
        }

        [Authorize(Roles = "Administrator,UserEditor")]
        [HttpPost("create")]
        public async Task<IActionResult> CreateNotification([FromBody] NewNotificationDto notification)
        {
            var created = await _services.NotificationService.CreateNotificationAsync(notification);
            return CreatedAtAction(nameof(CreateNotification), created);
        }
        

        [Authorize(Roles = "Administrator,Worker")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteNotification(int id)
        {
            await _services.NotificationService.DeleteNotificationAsync(id);
            return NoContent();
        }
    }
}
