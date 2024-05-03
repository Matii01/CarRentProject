using CarRent.data.Models.CarRent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.DTO
{
    //public record NewRental(int CarId, DateTime DateFrom, DateTime DateTo);
    public record RentalDates(int CarId, DateTime DateFrom, DateTime DateTo);
    public record NewRentalForClient(int CarId, DateTime DateFrom, DateTime DateTo);
    public record ClientDetailsDto(
        string FirstName, 
        string LastName, 
        string Email, 
        string PhoneNumber, 
        string Address, 
        string PostCode,
        string City
    );

    public record InvoiceDto(
        int Id, 
        string Number, 
        string? Comment, 
        IndividualClient? Client, 
        List<InvoiceItemDto> InvoiceItems);
    
    public record InvoiceItemDto(
        int InvoiceId,
        decimal Rabat,
        decimal Net,
        decimal Gross,
        decimal PaidAmount,
        decimal VAT,
        decimal VATValue,
        Rental? Rental
    );

    public record InvoiceAndRentalDto(
        int InvoiceId,
        decimal Rabat,
        decimal Net,
        decimal Gross,
        decimal PaidAmount,
        decimal VAT,
        decimal VATValue,
        int CarId,
        DateTime DateFrom, DateTime DateTo
    );

    public record AllRentalDataDto(
        NewRentalForClient NewRentalForClient, 
        ClientDetailsDto ClientDetails, 
        InvoiceDto Invoice);

    public record RentalStatusDto(
        int Id, 
        string Status, 
        string? Remarks, 
        bool? IsDefault
    );
    
    public record UpdateRentalStatusDto(
        int OldStatus,
        int NewStatus
    );

    public record UpdateInvoiceDto(
        int OldStatus,
        int NewStatus,
        decimal? Paid
    );

    public record RentalListDto(
        int Id, 
        Client Client,
        string CarName, 
        string Status, 
        DateTime RentalStart, 
        DateTime RentalEnd
    );

    public record RentalListDataDto(
        int Id, 
        string Name,
        string CarName,
        string Status,
        DateTime RentalStart, 
        DateTime RentalEnd
    );

    public record UserRentalListDto(
        int Id,
        int InvoiceId,
        string Name,
        string CarName,
        DateTime RentalStart,
        DateTime RentalEnd
    );

    public record UserRentalDetailDto(
        int Id,
        int InvoiceId,
        string Name,
        int CarId,
        string CarName,
        string CarImg,
        string Status,
        decimal TotalPrice,
        decimal Vat,
        DateTime RentalStart,
        DateTime RentalEnd
    );

    public record RentalDatesDto(
        DateTime RentalStart, 
        DateTime RentalEnd
    );

    public record ChangeRentedCar(int RentalId, int NewCarId);

    public record RentalDataForClientDto(
        string ClientName, 
        DateTime DateFrom, 
        DateTime DateTo, 
        string CarName,
        string CarImage,
        decimal TotalCost
        );

    public record FirmClientDto(
            string PostCode ,
            string City ,
            string NIP ,
            string CompanyName,
            string StreetAndNumber 
        );

    public record RentalDetailsDto (
        int RentalId,
        int CarId,
        string CarName,
        string CarImage,
        string CarMark,
        DateTime RentalStart,
        DateTime RentalEnd,
        string RentalStatus,
        int? RentalStatusId
        );
 
    public record InvoiceItemWithRentalDetailDto(
       int InvoiceId,
       decimal Rabat,
       decimal Net,
       decimal Gross,
       decimal PaidAmount,
       decimal VAT,
       decimal VATValue,
       RentalDetailsDto? Rental
   );

    public record InvoiceWithClient(
        int Id,
        int? InvoiceStatusId,
        string Number,
        string? Comment,
        decimal? TotalToPay,
        decimal? TotalPay,
        bool? IsEditable,
        DateTime? CreatedDate,
        DateTime? PaymentDate,
        Client? Client,
        List<InvoiceItemWithRentalDetailDto> InvoiceItems);

    public record InvoiceWithFirmClient(
        int Id,
        int? InvoiceStatusId,
        string Number,
        string? Comment,
        bool? IsIndividual,
        decimal? TotalToPay,
        decimal? TotalPay,
        bool? IsEditable,
        List<InvoiceItemWithRentalDetailDto> InvoiceItems
    )
    {
        public FirmClientDto? Client { get; set; }
    }

    public record InvoiceWithIndividualClient(
        int Id,
        int? InvoiceStatusId,
        string Number,
        string? Comment,
        bool? IsIndividual,
        decimal? TotalToPay,
        decimal? TotalPay,
        bool? IsEditable,
        DateTime? CreatedDate,
        DateTime? PaymentDate,
        IndividualClient? Client,
        List<InvoiceItemWithRentalDetailDto> InvoiceItems
    );

    public record NewInvoiceDto(
        bool IsIndividual,
        InvoiceWithFirmClient? InvoiceFirm, 
        InvoiceWithIndividualClient? InvoiceIndividual
    );

    public record RentalDetailsForWorkerViewDto(
        RentalDatesDto? RentalInfo, 
        NewInvoiceDto? Invoice
    );

    public record DataForInvoice(
        DateTime PaymentTerm,
        decimal ToPaid,
        decimal Paid
    );

    public record NewRentalFromWorker(
        ClientDetailsDto? ClientDetails,
        FirmClientDto? FirmClientDto,
        DataForInvoice? Invoice,
        NewRentalForClient[] Rentals
    );
}
