using CarRent.data.Models.Company;
using CarRent.Repository.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Extensions
{
    public static class MessagesRepositoryExtension
    {
        public static IQueryable<Message> Search(this IQueryable<Message> list, MessagesParameters param)
        {
            if (param.Name != null)
            {
                list = list.Where(x => x.Name.Contains(param.Name));
            }

            if (param.Email != null)
            {
                list = list.Where(x => x.Name.Contains(param.Email));
            }

            if (param.CreatedStart != null)
            {
                list = list.Where(x => x.CreatedDate >= param.CreatedStart);
            }

            if (param.CreatedEnd != null)
            {
                list = list.Where(x => x.CreatedDate <= param.CreatedEnd);
            }

            if (param.AnsweredStart != null)
            {
                list = list.Where(x => x.AnsweredDate >= param.CreatedStart);
            }

            if (param.AnsweredEnd != null)
            {
                list = list.Where(x => x.AnsweredDate <= param.AnsweredEnd);
            }

            if (param.IsAnswered != null)
            {
                list = list.Where(x => x.IsAnswered == param.IsAnswered);
            }

            return list;
        }
    }
}
