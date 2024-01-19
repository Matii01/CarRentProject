using CarRent.data.DTO;
using CarRent.data.Models.User;
using CarRent.Repository;
using CarRent.Repository.Parameters;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;
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

        //[HttpGet("details/{id:int}")]
        [HttpGet("rentalDetail/{paymentId}")]
        public async Task<IActionResult> GetRentalDetailsByPaymentId(string paymentId)
        {
            var item = await _services.RentalService.GetRentalInfoByPaymentIdAsync(paymentId);
            return Ok(item);
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRentalDetailsById(int id)
        {
            var item = await _services.RentalService.GetInvoiceRentalDetailsAsync(id);
            return Ok(item);
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

            var items = await _services.RentalService.GetUserRentalsAsync(user.Id);

            return Ok(items);
        }

        [Authorize(Roles = "User")]
        [HttpGet("UserRental/{id}")]
        public async Task<IActionResult> GetUserRentalDetail(int id)
        {
            var username = User.Identity.Name;
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound();
            }

            await Console.Out.WriteLineAsync($"{user.Id} : {id}");

            var item = await _services.RentalService.GetUserRentalDetailAsync(user.Id, id);

            return Ok(item);
        }

        [HttpGet("CheckPrice")]
        public async Task<IActionResult> CheckPrice([FromQuery] NewRentalForClient dates)
        {
            var cost = await _services.PriceListService.GetPriceForCarForDate(null, dates);
            var total = cost.Gross - cost.Rabat;

            await Console.Out.WriteLineAsync("logged off");
            return Ok(total);
        }

        [Authorize(Roles = "User")]
        [HttpGet("CheckPriceForClient")]
        public async Task<IActionResult> CheckPriceForClient([FromQuery] NewRentalForClient dates)
        {
            if (User == null || User.Identity == null)
            {
                throw new Exception();
            }

            var username = User.Identity.Name ?? throw new Exception("");
            var user = await _userManager.FindByNameAsync(username) ?? throw new Exception("");
            var cost = await _services.PriceListService.GetPriceForCarForDate(user.Id, dates);
            var total = cost.Gross - cost.Rabat;
            await Console.Out.WriteLineAsync("logged in");

            return Ok(total);
        }

        [HttpGet("takenDates/{id:int}")]
        public async Task<IActionResult> GetFutureRentalDatesForCar(int id)
        {
            var excludedDates = await _services.RentalService.GetFutureRentalDatesForCarAsync(id);
            return Ok(excludedDates);
        }

        [HttpGet("statuses")]
        public async Task<IActionResult> GetStatusesForRentalEdit()
        {
            var RentalStatuses = await _services.RentalStatusService.GetAllActiveAsync(false);
            var InvoiceStatuses = await _services.InvoiceStatusService.GetAllActiveAsync(false);

            return Ok(new { rentalStatus = RentalStatuses, invoiceStatus = InvoiceStatuses });
        }

        [HttpPost("IsDateAvailable")]
        public async Task<IActionResult> IsDateAvailable([FromBody] NewRentalForClient dates)
        {
            await Console.Out.WriteLineAsync("carId = ===" + dates.CarId);
            if (dates.CarId == 0)
            {
                return NotFound();
            }

            await Console.Out.WriteLineAsync("data: " + dates);

            var isAvailable = await _services.RentalService.IsAvailable(dates);
            return Ok(isAvailable);
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("UpdateRentalStatus/{rentalId:int}")]
        public async Task<IActionResult> UpdateRentalStatus(int rentalId, [FromBody] UpdateRentalStatusDto statusDto )
        {
            // To do send notification

            await _services.RentalService.UpdateRentalStatusAsync(rentalId, statusDto);
            return Ok("");
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("UpdateInvoiceStatus/{invoiceId:int}")]
        public async Task<IActionResult> UpdateInvoiceStatus(int invoiceId, [FromBody] UpdateInvoiceStatusDto statusDto)
        {
            // To do send notification

            await _services.RentalService.UpdateInvoiceStatusAsync(invoiceId, statusDto);
            return Ok("");
        }


        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("replaceCar")]
        public async Task<IActionResult> ChangeRentalCar([FromBody] ChangeRentedCar newData)
        {
            // new CarId, RentalId, Remark 
            // Should first check if new car is available and only if it is, change car 
            //_services.RentalService.ChangeCar

            await _services.RentalService.ChangeRentedCarAsync(newData);
            return Ok("");
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("replaceCar/{rentalId:int}")]
        public async Task<IActionResult> CancelRental(int rentalId)
        {
            // new CarId, RentalId, Remark 
            // Should first check if new car is available and only if it is, change car 
            //_services.RentalService.ChangeCar

            //await _services.RentalService.ChangeRentedCarAsync(newData);
            return Ok("");
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

        [HttpGet("generateInvoice/{rentalId:int}")]
        public async Task<IActionResult> GenerateInvoiceForRental(int rentalId)
        {
            await Console.Out.WriteLineAsync("invoice will be generated");
            var data = await _services.RentalService.GetDataForGenerateInvoice(rentalId);
            var path = _services.GenerateDocumentService.GenerateInvoiceDocxDocumentAsync(data);

            return Ok("");
        }
        
        [HttpGet("getInvoiceDocument/{rentalId:int}")]
        public async Task<IActionResult> GenerateInvoice(int rentalId)
        {
            //await Console.Out.WriteLineAsync("invoice will be generated");
            var data = await _services.RentalService.GetDataForGenerateInvoice(rentalId);
            var path = _services.GenerateDocumentService.GenerateInvoiceDocxDocumentAsync(data);

            if (!System.IO.File.Exists(path))
            {
                return NotFound();
            }

            var memory = new MemoryStream();
            using(var stream = new FileStream(path, FileMode.Open))
            {
                stream.CopyTo(memory);
            }
            memory.Position = 0;

            return File(memory, "application/vnd.openxmlformats-officedocument.wordprocessingml.document", Path.GetFileName(path));
        }
        
    }
}



/*
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
       }*/