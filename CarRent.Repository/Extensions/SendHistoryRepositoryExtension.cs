using CarRent.data.Models.Company;
using CarRent.data.Models.Workers;
using CarRent.Repository.Parameters;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Extensions
{
    public static class SendHistoryRepositoryExtension
    {
        public static IQueryable<SendHistory> Search(this IQueryable<SendHistory> list,  SendHistoryParameters param)
        {


            return list;
        }
    }
}
