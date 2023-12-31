using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Models.Workers;
using CarRent.Repository.Interfaces;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Service
{
    public class WorkerSidebarService : ServiceBase, IWorkerSidebarService
    {
        public WorkerSidebarService(IRepositoryManager repository, IMapper mapper) 
            : base(repository, mapper)
        {

        }

        public async Task<WorkerSidebarDto[]> GetWorkerSidebarAsync(string workerId)
        {
            var items = await _repository.UserWorkerPaths
                .FindByCondition(x => x.UserAccountId == workerId, false)
                .Include(x=>x.WorkerPaths)
                .ThenInclude(x=>x.Paths)
                .ToListAsync();
           
            return items.Select(x => new WorkerSidebarDto(
                x.WorkerPaths.Title,
                x.WorkerPaths.Icon,
                x.WorkerPaths.IsActive,
                x.WorkerPaths.Paths.Select(y => new 
                    WorkerSidebarItemDto(y.Name,y.Path,y.IsActive)).ToList()
                )).ToArray();
        }

        public async Task GenerateWorkerSidebarAsync(WorkerSidebarDto[] Sidebar, string workerId)
        {
            foreach (WorkerSidebarDto sidebar in Sidebar)
            {

                UserWorkerPaths userWorkerPaths = new ()
                {
                    UserAccountId = workerId,
                    WorkerPaths = new WorkerPaths()
                    {
                        Title = sidebar.Title,
                        Icon = sidebar.Icon,
                        IsActive = sidebar.IsActive,
                        Paths = sidebar.Children.Select(x => new PathItem
                        {
                            Name = x.Name,
                            Path = x.Path,
                            IsActive = x.IsActive,
                        }).ToList(),
                    }
                };
                _repository.UserWorkerPaths.Create(userWorkerPaths);
                await _repository.SaveAsync();
            }
        }

        public async Task<WorkerSidebarDto[]> EditWorkerSidebarAsync(WorkerSidebarDto[] Sidebar, string workerId)
        {
            var items = await _repository.UserWorkerPaths
                .FindByCondition(x => x.UserAccountId == workerId, true)
                .Include(x => x.WorkerPaths)
                .ThenInclude(x => x.Paths)
                .ToListAsync();

            foreach (var item in items)
            {
                item.WorkerPaths.IsActive = Sidebar
                    .Where(x => x.Title == item.WorkerPaths.Title)
                    .Select(x => x.IsActive)
                    .SingleOrDefault();


                if (item.WorkerPaths.Paths != null)
                {
                    foreach(var path in item.WorkerPaths.Paths)
                    {
                        var active = Sidebar
                            .Where(x => x.Title == item.WorkerPaths.Title)
                            .Select(x => x.Children.Where(y => y.Path == path.Path))
                            .First();

                        path.IsActive = active.First().IsActive;
                    }
                }
            }

            await _repository.SaveAsync();

            return items.Select(x => new WorkerSidebarDto(
               x.WorkerPaths.Title,
               x.WorkerPaths.Icon,
               x.WorkerPaths.IsActive,
               x.WorkerPaths.Paths.Select(y => new
                   WorkerSidebarItemDto(y.Name, y.Path, y.IsActive)).ToList()
               )).ToArray();
        } 
    }
}


/*
 WorkerPaths workerPath = new()
    {
        Title = sidebar.Title,
        Icon = sidebar.Icon,
        IsActive = sidebar.IsActive,
        Paths = sidebar.Children.Select(x => new PathItem
        {
            Name = x.Name,
            Path = x.Path,
            IsActive = x.IsActive,
        }).ToList(),
    };
 */