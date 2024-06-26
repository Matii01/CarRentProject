﻿using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Parameters;

namespace CarRent.Service.Interfaces
{
    public interface IRentalService
    {
        Task<bool> IsAvailable(NewRentalForClient newRental);
        Task UpdateRentalStatusAsync(int rentalId, UpdateRentalStatusDto newStatus);
        Task UpdateInvoiceAsync(int rentalId, UpdateInvoiceDto newStatus);
        Task<InvoiceClient> AddInvoiceClient(int invoiceId, int clientId);
        Task<PagedList<RentalListDataDto>> GetRentalsListAsync(RentalParameters param, bool tractChanges);
        Task<PagedList<UserRentalListDto>> GetUserRentalsAsync(OrderParameters param);
        Task<UserRentalDetailDto> GetUserRentalDetailAsync(string userId, int id);
        Task<IEnumerable<RentalDatesDto>> GetFutureRentalDatesForCarAsync(int CarId);
        Task<PagedList<InvoiceDto>> GetRentalsListAsync(OrderParameters param, bool tractChanges);
        Task<InvoiceDto> GetRentalInfoByPaymentIdAsync(string paymentId);
        Task<NewInvoiceDto> GetInvoiceRentalDetailsAsync(int id);
        Task<NewInvoiceDto> GetDataForGenerateInvoice(int id);
        Task ChangeRentedCarAsync(ChangeRentedCar newCar);
        Task<IEnumerable<int>> GetCarsThatHaveRentalInDates(NewRentalForClient dates);
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

        Task CreateRentalsAndInvoice(NewRentalFromWorker data);

        Task<bool> CreateRentalAndAssignUser(
                string userId, 
                string? paymentIntentId,
                InvoiceDto invoiceDto,
                NewRentalForClient newRental,
                ClientDetailsDto clientDetails
                );
    }
}
