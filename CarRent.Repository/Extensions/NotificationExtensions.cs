using CarRent.data.Models.User;
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
    public static class NotificationExtensions
    {
        public static IQueryable<Notification> Search(this IQueryable<Notification> list, NotificationParameters param)
        {
            if (param.UserId != null)
            {
                list = list.Where(x => x.UserId == param.UserId);
            }
            
            if (param.CreatedStart != null)
            {
                list = list.Where(x => x.CreatedDate >= param.CreatedStart);
            }

            if (param.CreatedEnd != null)
            {
                list = list.Where(x => x.CreatedDate <= param.CreatedStart);
            }

            if(param.IsRead != null) 
            {
                list = list.Where(x => x.IsRead == param.IsRead);
            }

            return list;
        }
    }
}
