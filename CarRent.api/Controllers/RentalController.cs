﻿using CarRent.data.DTO;
using CarRent.data.Models.User;
using CarRent.Repository;
using CarRent.Repository.Parameters;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Security.Claims;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class RentalController : BaseController
    {
        private readonly UserManager<User> _userManager;
        private readonly CarRentContext _db;
        public RentalController(IServiceManager serviceManager, CarRentContext db,
        UserManager<User> userManager)
            : base(serviceManager)
        {
            _userManager = userManager;
            _db = db;
        }

        [HttpGet("AllRentals")]
        public async Task<IActionResult> AllRentals([FromQuery] RentalParameters param)
        {
            var list = await _services.RentalService.GetRentalsListAsync(param, false);
            return Ok(list);
        }

        [HttpGet("AllOrders")]
        public async Task<IActionResult> AllOrders([FromQuery] OrderParameters param)
        {
            var list = await _services.RentalService.GetRentalsListAsync(param, false);
            return Ok(list);
        }

        [Authorize(Roles = "User")]
        [HttpGet("UserRental")]
        public async Task<IActionResult> GetUserRental()
        {
            var username = User.Identity.Name;
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound();
            }

            var items = await _services.RentalService.GetUserRentalAsync(user.Id);

            return Ok(items);
        }

        [Authorize(Roles = "User")]
        [HttpPost("AddNewUserRental")]
        public async Task<IActionResult> AddRental([FromBody] object allRentalData)
        {
            var temp = JsonConvert.DeserializeObject<AllRentalDataDto>(allRentalData.ToString());
            
            if(temp == null)
            {
                return Ok(false);
            }

            var username = User.Identity.Name;
            var user = await _userManager.FindByNameAsync(username);
            
            if (user == null)
            {
                return Ok(false);
            }

            var result = await _services.RentalService.CreateRentalAndInvoiceAndAssignUser
                (user.Id,
                temp.Invoice,
                temp.NewRentalForClient,
                temp.ClientDetails
                );

            return Ok(result);
        }

       
        [HttpPost("IsDateAvailable")]
        public async Task<IActionResult> IsDateAvailable([FromBody] NewRentalForClient dates)
        {
            //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            //var username = User.Identity.Name;
            //var _user = await _userManager.FindByNameAsync(username);
            //await Console.Out.WriteLineAsync("id: " + userId);
            //await Console.Out.WriteLineAsync("username: "+ username);
            //await Console.Out.WriteLineAsync("username: "+ _user.Id);

            await Console.Out.WriteLineAsync("carId = ==="+dates.CarId);
            if (dates.CarId == 0)
            {
                return NotFound();
            }

            await Console.Out.WriteLineAsync("data: " + dates);

            var isAvailable = await _services.RentalService.IsAvailable(dates);
            return Ok(isAvailable);
        }

        [HttpGet("CheckPrice")]
        public async Task<IActionResult> CheckPrice([FromQuery] NewRentalForClient dates)
        {
            var cost = await _services.PriceListService.GetPriceForCarForDate(null, dates);
            var total = cost.Gross - cost.Rabat;

            return Ok(total);
        }

        [Authorize(Roles = "User")]
        [HttpGet("CheckPriceForClient")]
        public async Task<IActionResult> CheckPriceForClient([FromQuery] NewRentalForClient dates)
        {
            if(User == null || User.Identity == null)
            {
                throw new Exception();
            }

            var username = User.Identity.Name ?? throw new Exception("");
            var user = await _userManager.FindByNameAsync(username) ?? throw new Exception("");
            var cost = await _services.PriceListService.GetPriceForCarForDate(user.Id, dates);
            var total = cost.Gross - cost.Rabat;

            return Ok(total);
        }


        [Authorize(Roles = "User")]
        [HttpPost("AddNewUserRentalTest")]
        public async Task<IActionResult> AddRentalTest([FromBody] object allRentalData)
        {
            return Ok(1);

            //var temp = JsonConvert.DeserializeObject<AllRentalDataDto>(allRentalData.ToString());
            //await Console.Out.WriteLineAsync(temp.ToString());
            //await Console.Out.WriteLineAsync("asdasdasd");
            //return Ok(1);
        }
    }
}
