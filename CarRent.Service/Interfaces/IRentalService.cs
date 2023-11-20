using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface IRentalService
    {
        Task<InvoiceClient> AddInvoiceClient(int invoiceId, int clientId);

        /// <summary>
        /// Create Invoice 
        /// </summary>
        /// <param name="invoiceDto"></param>
        /// <param name="newRental"></param>
        /// <param name="price"></param>
        /// <returns></returns>
        Task<Rental> CreateInvoiceAndAddRental(
              string? uerId,
              InvoiceDto invoiceDto,
              NewRentalForClient newRental,
              PriceForCar price);
    }
}
