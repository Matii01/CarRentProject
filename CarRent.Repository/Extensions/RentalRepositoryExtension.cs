using CarRent.data.DTO;
using CarRent.data.Models;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Parameters;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Extensions
{
    public static class RentalRepositoryExtension
    {
        public static IQueryable<Rental> Search(this IQueryable<Rental> rentals, CarRentContext context, RentalParameters param)
        {
            if (param.ClientId != null)
            {
               var list = context.UserRentals
                    .Include(x=>x.Rental)
                    .Where(x => x.UserAccountId == param.ClientId)
                    .Select(x => x.Rental);
                
                if (list.Any())
                {
                    rentals = list;
                }
            }

            if (param.RentalStatusId != null)
            {
                rentals = rentals.Where(x => x.RentalStatusId == param.RentalStatusId);
            }

            if (param.CarId != null)
            {
                rentals = rentals.Where(x => x.CarId == param.CarId);
            }

            if (param.RentalStart != null)
            {
                rentals = rentals.Where(x => x.RentalStart >= param.RentalStart);
            }

            if (param.RentalEnd != null)
            {
                rentals = rentals.Where(x => x.RentalEnd <= param.RentalEnd);
            }
            
            return rentals;
        }

        public static IQueryable<Invoice> Search(this IQueryable<Invoice> invoices, CarRentContext context, OrderParameters param)
        {
            return invoices;
        }

        //public static async Task<PagedList<RentalListData>> GetPagedListAsync(this IQueryable<Rental> rentals, RentalParameters param)
        //{

        //}
    }
}
