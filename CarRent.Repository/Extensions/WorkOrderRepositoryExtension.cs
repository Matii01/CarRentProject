using CarRent.data.Models.CarRent;
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
    public static class WorkOrderRepositoryExtension
    {
        public static IQueryable<WorkOrder> Search(this IQueryable<WorkOrder> list, CarRentContext context, WorkOrderParameters param)
        {
            if (param.WorkerId != null)
            {
                var result = context.WorkOrderWorker
                   .Include(x => x.WorkOrder)
                   .Where(x => x.WorkerId == param.WorkerId)
                   .Select(x => x.WorkOrder);

                if (list.Any())
                {
                    list = result;
                }
            }


            if (param.WorkOrderPriority != null)
            {
                list = list.Where(x => x.WorkOrderPriorityId == param.WorkOrderPriority);
            }

            if (param.WorkOrderStatus != null)
            {
                list = list.Where(x => x.WorkOrderStatusId == param.WorkOrderStatus);
            }

            if (param.CreatedDataStart != null)
            {
                list = list.Where(x => x.CreatedData >= param.CreatedDataStart);
            }

            if (param.CreatedDataEnd != null)
            {
                list = list.Where(x => x.CreatedData <= param.CreatedDataStart);
            }

            if (param.ScheduledDateStart != null)
            {
                list = list.Where(x => x.ScheduledDate >= param.ScheduledDateStart);
            }

            if (param.ScheduledDateEnd != null)
            {
                list = list.Where(x => x.ScheduledDate <= param.ScheduledDateEnd);
            }
            
            if (param.CompletedDateStart != null)
            {
                list = list.Where(x => x.CompletedDate >= param.CompletedDateStart);
            }

            if (param.CompletedDateEnd != null)
            {
                list = list.Where(x => x.CompletedDate <= param.CompletedDateEnd);
            }

            if (param.EstimatedHoursMin != null)
            {
                list = list.Where(x => x.EstimatedHours >= param.EstimatedHoursMin);
            }

            if (param.EstimatedHoursMax != null)
            {
                list = list.Where(x => x.EstimatedHours <= param.EstimatedHoursMax);
            }

            if (param.ActualHoursMin != null)
            {
                list = list.Where(x => x.ActualHours >= param.ActualHoursMin);
            }

            if (param.ActualHoursMax != null)
            {
                list = list.Where(x => x.ActualHours <= param.ActualHoursMax);
            }

            return list;
        }
    }
}
