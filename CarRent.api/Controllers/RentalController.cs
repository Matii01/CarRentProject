using CarRent.data.DTO;
using CarRent.Repository;
using CarRent.Repository.Parameters;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    public class RentalController : BaseController
    {
        private readonly CarRentContext _db;
        private readonly IAuthenticationService _authentication;
        public RentalController(IServiceManager serviceManager,  CarRentContext db,
         IAuthenticationService authentication)
            : base(serviceManager)
        {
            _db = db;
            _authentication = authentication;
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
        public async Task<IActionResult> GetUserRental([FromQuery] OrderParameters param)
        {
            var userId = await _authentication.GetUserIdByClaims(User);

            param.ClientId = userId;
            var items = await _services.RentalService.GetUserRentalsAsync(param);

            return Ok(items);
        }

        [Authorize(Roles = "User")]
        [HttpGet("UserRental/{id}")]
        public async Task<IActionResult> GetUserRentalDetail(int id)
        {
            var userId = await _authentication.GetUserIdByClaims(User);
            var item = await _services.RentalService.GetUserRentalDetailAsync(userId, id);

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
            var user = await _authentication.GetUserByClaims(User);
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

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("createNewRental")]
        public async Task<IActionResult> CreateNewRental([FromBody] NewRentalFromWorker data)
        {
            await _services.RentalService.CreateRentalsAndInvoice(data);

            foreach(var item in data.Rentals) {
                await Console.Out.WriteLineAsync(item.ToString());
            }
            return Ok("");
        }

        [HttpPost("IsDateAvailable")]
        public async Task<IActionResult> IsDateAvailable([FromBody] NewRentalForClient dates)
        {
            if (dates.CarId == 0)
            {
                return NotFound();
            }

            var isAvailable = await _services.RentalService.IsAvailable(dates);
            return Ok(isAvailable);
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("UpdateRentalStatus/{rentalId:int}")]
        public async Task<IActionResult> UpdateRentalStatus(int rentalId, [FromBody] UpdateRentalStatusDto statusDto )
        {
            await _services.RentalService.UpdateRentalStatusAsync(rentalId, statusDto);
            return Ok("");
        }

        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("UpdateInvoiceStatus/{invoiceId:int}")]
        public async Task<IActionResult> UpdateInvoiceStatus(int invoiceId, [FromBody] UpdateInvoiceDto statusDto)
        {
            await _services.RentalService.UpdateInvoiceAsync(invoiceId, statusDto);
            return Ok("");
        }


        [Authorize(Roles = "Administrator,Worker")]
        [HttpPost("replaceCar")]
        public async Task<IActionResult> ChangeRentalCar([FromBody] ChangeRentedCar newData)
        {
            await _services.RentalService.ChangeRentedCarAsync(newData);
            return Ok("");
        }

        [HttpGet("generateInvoice/{rentalId:int}")]
        public async Task<IActionResult> GenerateInvoiceForRental(int rentalId)
        {
            var aboutCompany = await _services.AboutCompanyService.GetAboutCompany();
            await Console.Out.WriteLineAsync("invoice will be generated");
            var data = await _services.RentalService.GetDataForGenerateInvoice(rentalId);
            var path = _services.GenerateDocumentService.GenerateInvoiceDocxDocumentAsync(data, aboutCompany);

            return Ok("");
        }
        
        [HttpGet("getInvoiceDocument/{rentalId:int}")]
        public async Task<IActionResult> GenerateInvoice(int rentalId)
        {
            var aboutCompany = await _services.AboutCompanyService.GetAboutCompany();
            var data = await _services.RentalService.GetDataForGenerateInvoice(rentalId);
            var path = _services.GenerateDocumentService.GenerateInvoiceDocxDocumentAsync(data, aboutCompany);

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

