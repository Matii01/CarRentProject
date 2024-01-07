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
    public static class MaintenanceRepositoryExtension
    {
        public static IQueryable<CarMaintenance> Search(this IQueryable<CarMaintenance> list,  MaintenanceParameters param)
        {
            if (param.CarId != null)
            {
                list = list.Where(x => x.CarId == param.CarId);
            }

            if (param.OnlyFutured == true)
            {
                list = list.Where(x => x.DateEnd >= DateTime.Now);
            }

            if (param.MaintenanceStart != null && param.OnlyFutured == false)
            {
                list = list.Where(x => x.DateStart >= param.MaintenanceStart);
            }

            if (param.MaintenanceEnd != null && param.OnlyFutured == false)
            {
                list = list.Where(x => x.DateEnd <= param.MaintenanceEnd);
            }

            return list;
        }
    }
}
