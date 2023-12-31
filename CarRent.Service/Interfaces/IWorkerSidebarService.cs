using CarRent.data.DTO;
using CarRent.data.Models.Workers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface IWorkerSidebarService
    {
        Task GenerateWorkerSidebarAsync(WorkerSidebarDto[] Sidebar, string workerId);
        Task<WorkerSidebarDto[]> EditWorkerSidebarAsync(WorkerSidebarDto[] Sidebar, string workerId);
        Task<WorkerSidebarDto[]> GetWorkerSidebarAsync(string workerId);
    }
}
