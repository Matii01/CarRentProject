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

    
    public record InvoiceDto(int Id, string Number, string? Comment, IndividualClient? Client, List<InvoiceItemDto> InvoiceItems);
    public record InvoiceItemDto(
        int InvoiceId,
        decimal Rabat,
        decimal Net,
         decimal Gross,
         decimal VAT,
         decimal VATValue
        ,Rental? Rental
        );

    public record AllRentalDataDto(
        NewRentalForClient NewRentalForClient, 
        ClientDetailsDto ClientDetails, 
        InvoiceDto Invoice);

    public record RentalStatusDto(int Id, string Status, string? Remarks, bool? IsDefault);
    public record RentalListDto(int Id, Client Client,string CarName, DateTime RentalStart, DateTime RentalEnd);
    public record RentalListDataDto(int Id, string Name, string CarName, DateTime RentalStart, DateTime RentalEnd);
    public record RentalDatesDto(DateTime RentalStart, DateTime RentalEnd);


    public record RentalDataForClientDto(
        string ClientName, 
        DateTime DateFrom, 
        DateTime DateTo, 
        string CarName,
        string CarImage,
        decimal TotalCost
        );
}
