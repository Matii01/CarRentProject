using CarRent.data.Models.Company;
using CarRent.Repository.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Extensions
{
    public static class SubscriberRepositoryExtension
    {
        public static IQueryable<NewsletterSubscriber> Search(this IQueryable<NewsletterSubscriber> list, SubscriberParam param)
        {

            return list;
        }
    }
}
