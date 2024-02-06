using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Extensions;
using CarRent.Repository.Interfaces;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;
using Stripe;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Service
{
    public class ReportService : ServiceBase, IReportService
    {
        public ReportService(IRepositoryManager repository, IMapper mapper) 
            : base(repository, mapper)
        {
        }

        public async Task<IEnumerable<ForMonthReport>> GetMonthReport(ReportParamDto parameters)
        {
            InvoiceParamDto newParam = new(parameters.DateFrom, parameters.DateTo);
            var list = await GetInvoiceReport(newParam);

            List<ForMonthReport> result = new();

            foreach(var item in list)
            {
                if (item.CreatedDate.HasValue)
                {
                    ForMonthReport newValue = new ()
                    {
                        Amount = item.TotalPaid ?? 0,
                        Year = item.CreatedDate.Value.Year,
                        MonthValue = item.CreatedDate.Value.Month,
                        Month = GetMonthName(item.CreatedDate.Value.Month)
                    };
                    AddMonthReportToList(result, newValue);
                }
            }

            return result;
        }

        public async Task<IEnumerable<InvoiceForReportDto>> GetInvoiceReport(InvoiceParamDto parameters)
        {
            var list = await _repository.Invoice
                .FindByCondition(x => x.IsActive == true, false)
                .Search(parameters)
                .Select(x => new InvoiceForReportDto(
                    x.Id, 
                    GetClientName(x.Client),
                    x.TotalPaid, 
                    x.TotalToPay, 
                    x.CreatedDate, 
                    x.PaymentDate))
                .ToListAsync();

            return list;
        }

        public async Task<IEnumerable<ForCarsReport>> GetCarsReport(ReportParamDto parameters)
        {
            var list = await _repository.Rentals
                .FindByCondition(x => x.IsActive == true, false)
                .Include(x=>x.Car)
                .Include(x=>x.InvoiceItem)
                .Search(parameters)
                .ToListAsync();

            var carList = new List<ForCarsReport>();
            foreach (var item in list)
            {
                ForCarsReport newItem = new()
                {
                    CarId = item.CarId,
                    CarName = item.Car.Name,
                    Cost = item?.InvoiceItem?.PaidAmount ?? 0,
                    RentalCount = 1,
                    TotalRentalDays = (item.RentalEnd - item.RentalStart).Days,
                    AverageRentalDays = (item.RentalEnd - item.RentalStart).Days,
                };
                AddCarToReport(carList, newItem);
            }

            return carList;
        }

        private static void AddCarToReport(List<ForCarsReport> list, ForCarsReport item)
        {
            var toUpdate = list.Find(x => x.CarId == item.CarId);

            if (toUpdate == null)
            {
                list.Add(item);
            }
            else
            {
                toUpdate.Cost += item.Cost;
                toUpdate.TotalRentalDays += item.TotalRentalDays;
                toUpdate.RentalCount++;
                toUpdate.AverageRentalDays = toUpdate.TotalRentalDays / toUpdate.RentalCount;
            }
        }

        private static void AddMonthReportToList(List<ForMonthReport> list, ForMonthReport item)
        {
            var toUpdate = list.Find(x => x.Year == item.Year && x.MonthValue == item.MonthValue);
            
            if(toUpdate == null)
            {
                list.Add(item);  
            }
            else
            {
                toUpdate.Amount += item.Amount;
            }
        }

        private static string GetClientName(Client? Client)
        {
            if (Client is IndividualClient)
            {
                if (Client is not IndividualClient c)
                {
                    return "";
                }
                return $"{c.FirstName} {c.LastName}";
            }
            else if(Client is FirmClient)
            {
                if (Client is not FirmClient c)
                {
                    return "";
                }
                return $"{c.CompanyName}";
            }
            return "";
        }

        private static string GetMonthName(int monthNumber)
        {
            if (monthNumber < 1 || monthNumber > 12)
            {
                throw new ArgumentOutOfRangeException(nameof(monthNumber), "Month number must be between 1 and 12.");
            }

            return CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(monthNumber);
        } 
    }
}
