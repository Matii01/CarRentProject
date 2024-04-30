using CarRent.data.DTO;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    public class WishlistController : BaseController
    {
        private readonly IAuthenticationService _authentication;
        public WishlistController(IServiceManager serviceManager, IAuthenticationService authentication ) 
            : base(serviceManager)
        {
            _authentication = authentication;
        }

        [Authorize(Roles = "User")]
        [HttpGet]
        public async Task<IActionResult> GetUsersWishlist()
        {
            var userId = await _authentication.GetUserIdByClaims(User);

            var list = await _services.WishlistService.GetUserWishlistAsync(userId);
            return Ok(list);
        }

        [Authorize(Roles = "User")]
        [HttpGet("Wishlist")]
        public async Task<IActionResult> GetWishlistForView()
        {
            var userId = await _authentication.GetUserIdByClaims(User);

            var list = await _services.WishlistService.GetUserWishlistForViewAsync(userId);
            return Ok(list);
        }

        [Authorize(Roles = "User")]
        [HttpPost("add")]
        public async Task<IActionResult> AddElementToWishlist([FromBody] WishlistDto item)
        {
            var userId = await _authentication.GetUserIdByClaims(User);

            await _services.WishlistService.CreateAsync(item, userId);
            return Ok("");
        }

        [Authorize(Roles = "User")]
        [HttpDelete("{carId:int}")]
        public async Task<IActionResult> DeleteWishlistElement(int carId)
        {
            var userId = await _authentication.GetUserIdByClaims(User);

            await _services.WishlistService.DeleteAsync(carId, userId);
            return NoContent();
        }
    }
}
