using CarRent.data.DTO;
using CarRent.data.Models.User;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    public class WishlistController : BaseController
    {
        private readonly UserManager<User> _userManager;
        public WishlistController(IServiceManager serviceManager, UserManager<User> userManager) 
            : base(serviceManager)
        {
            _userManager = userManager;
        }

        [Authorize(Roles = "User")]
        [HttpGet]
        public async Task<IActionResult> GetUsersWishlist()
        {
            var username = User.Identity.Name;
            var user = await _userManager.FindByNameAsync(username);

            var list = await _services.WishlistService.GetUserWishlistAsync(user.Id);
            return Ok(list);
        }

        [Authorize(Roles = "User")]
        [HttpGet("Wishlist")]
        public async Task<IActionResult> GetWishlistForView()
        {
            var username = User.Identity.Name;
            var user = await _userManager.FindByNameAsync(username);

            var list = await _services.WishlistService.GetUserWishlistForViewAsync(user.Id);
            return Ok(list);
        }

        [Authorize(Roles = "User")]
        [HttpPost("add")]
        public async Task<IActionResult> AddElementToWishlist([FromBody] WishlistDto item)
        {
            var username = User.Identity.Name;
            var user = await _userManager.FindByNameAsync(username);

            await _services.WishlistService.CreateAsync(item, user.Id);
            
            return Ok("");
        }

        [Authorize(Roles = "User")]
        [HttpDelete("{carId:int}")]
        public async Task<IActionResult> DeleteWishlistElement(int carId)
        {
            var username = User.Identity.Name;
            var user = await _userManager.FindByNameAsync(username);

            await _services.WishlistService.DeleteAsync(carId, user.Id);
            return NoContent();
        }
    }
}
