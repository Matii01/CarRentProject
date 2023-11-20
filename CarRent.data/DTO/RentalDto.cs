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

    public record InvoiceDto(string Number, string? Comment);

    public record AllRentalDataDto(
        TokenDto Token,
        NewRentalForClient NewRentalForClient, 
        ClientDetailsDto ClientDetails, 
        InvoiceDto Invoice);
}
