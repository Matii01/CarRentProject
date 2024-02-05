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
    }
}
