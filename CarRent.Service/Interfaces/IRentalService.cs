using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Parameters;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface IRentalService
    {
        Task<bool> IsAvailable(NewRentalForClient newRental);
        Task<InvoiceClient> AddInvoiceClient(int invoiceId, int clientId);
        Task<PagedList<RentalListDataDto>> GetRentalsListAsync(RentalParameters param, bool tractChanges);
        Task<IEnumerable<UserRentalListDto>> GetUserRentalsAsync(string userId);
        Task<UserRentalDetailDto> GetUserRentalDetailAsync(string userId, int id);
        Task<IEnumerable<RentalDatesDto>> GetFutureRentalDatesForCarAsync(int CarId);
        Task<PagedList<InvoiceDto>> GetRentalsListAsync(OrderParameters param, bool tractChanges);
        Task<InvoiceDto> GetRentalInfoByPaymentIdAsync(string paymentId);
        /// <summary>
        /// Create Invoice 
        /// </summary>
        /// <param name="invoiceDto"></param>
        /// <param name="newRental"></param>
        /// <param name="price"></param>
        /// <returns></returns>
        //Task<Rental> CreateInvoiceAndAddRental(
        //      string? uerId,
        //      InvoiceDto invoiceDto,
        //      NewRentalForClient newRental,
        //      PriceForCar price);

        //Task<bool> CarHaveRentalInThisDate(NewRentalForClient rental);
        Task<bool> CarHaveRentalInThisDate(int CarId,
                DateTime DateStart,
                DateTime DateEnd);

        Task<RentalDataForClientDto> CreateRentalAndInvoiceAndAssignUser(
                string userId, 
                string? paymentIntentId,
                InvoiceDto invoiceDto,
                NewRentalForClient newRental,
                ClientDetailsDto clientDetails
                );
    }
}
