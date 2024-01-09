using CarRent.data.Models.CarRent;
using CarRent.Repository.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Extensions
{
    public static class CarOpinionRepositoryExtension
    {
        public static IQueryable<CarOpinion> Search(this IQueryable<CarOpinion> list, OpinionParameters param)
        {
            if (param.CarId != null)
            {
                list = list.Where(x => x.CarId == param.CarId);
            }

            if (param.UserId != null)
            {
                list = list.Where(x => x.UserId == param.UserId);
            }

            if (param.DateFrom != null)
            {
                list = list.Where(x => x.AddedDate >= param.DateFrom);
            }

            if (param.DateTo != null)
            {
                list = list.Where(x => x.AddedDate <= param.DateTo);
            }

            if (param.IsAccepted != null)
            {
                list = list.Where(x => x.IsAccepted == param.IsAccepted);
            }


            return list;
        }
    }
}
