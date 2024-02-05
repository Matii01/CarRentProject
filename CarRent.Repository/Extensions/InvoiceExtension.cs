using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Extensions
{
    public static class InvoiceExtension
    {
        public static IQueryable<Invoice> Search(this IQueryable<Invoice> list, InvoiceParamDto param)
        {
            if (param.CreatedDateFrom != null)
            {
                list = list.Where(x => x.CreatedDate >= param.CreatedDateFrom);
            }

            if (param.CreatedDateTo != null)
            {
                list = list.Where(x => x.CreatedDate <= param.CreatedDateTo);
            }

            return list;
        }

    }
}
