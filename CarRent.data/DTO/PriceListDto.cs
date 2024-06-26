﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.DTO
{
    public record PricelistItemDto(int Id,int Days, decimal Price, decimal OverlimitFee);
    public record NewtPricelistItemDto(int PriceListId, int Days, decimal Price, decimal OverlimitFee);

    public record PriceListDto(int Id, int CarId, string? Name, bool? IsDefault);
    public record PricelistDateDto(int Id, int PriceId, DateTime DateFrom, DateTime DateTo);
    public record PriceForCar(decimal Rabat, decimal Net, decimal Gross, decimal VAT, decimal VATValue);

    /*
    int Id { get; set; }
    int CarId { get; set; }
    Car Car { get; set; } = null!;
    DateTime DateFrom { get; set; }
    DateTime DateTo { get; set; }
     */

}
