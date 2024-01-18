using CarRent.data.Models.Workers;
using CarRent.Repository.Parameters;
using CarRent.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CarRent.data.Models.User;

namespace CarRent.Service.Extensions
{
    public static class UsersExtensions
    {
        public class UserParams : RequestParameters
        {
            public string SortField { get; set; } = "";
        }
        public static IList<User>? ToSortedList(this IList<User>? list, UserParams userParams)
        {
            //public string FirstName { get; set; }
            //public string LastName { get; set; }
            if (list == null)
            {
                return list;
            }

            if(userParams.SortField == "UserName")
            {
               list = list.OrderBy(x => x.UserName).ToList();
            }

            else if (userParams.SortField == "FirstName")
            {
                list = list.OrderBy(x => x.FirstName).ToList();
            }

            else if(userParams.SortField == "LastName")
            {
                list = list.OrderBy(x => x.LastName).ToList();
            }

            else if(userParams.SortField == "Email")
            {
                list = list.OrderBy(x => x.Email).ToList();
            }

            return list;
        }

        //public static PagedList<User>? ToPagedList(this IList<User>? list, UserParams userParams)
        //{

        //   // return PagedList<User>(list, list.Count, )
        //}
    }
}
