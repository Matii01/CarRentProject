using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Exceptions;
using CarRent.data.Models.CarRent;
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
    public class WorkOrderPriorityService : ServiceBase, IGenericService<WorkOrderPriorityDto>
    {
        public WorkOrderPriorityService(IRepositoryManager repository, IMapper mapper) 
            : base(repository, mapper)
        {
        }

        public async Task<WorkOrderPriorityDto> CreateAsync(WorkOrderPriorityDto type)
        {
            var newValue = _mapper.Map<WorkOrderPriority>(type);

            _repository.WorkOrderPriority.Create(newValue);
            await _repository.SaveAsync();

            return _mapper.Map<WorkOrderPriorityDto>(newValue);
        }
        public async Task<WorkOrderPriorityDto> GetAsync(int id, bool trackChanges)
        {
            var item = await _repository.WorkOrderPriority
               .GetAsync(id, trackChanges)
               .Select(x => _mapper.Map<WorkOrderPriorityDto>(x))
               .SingleOrDefaultAsync() ?? throw new DataNotFoundException("WorkOrderPriority not found"); ;

            return item;
        }

        public async Task<IEnumerable<WorkOrderPriorityDto>> GetAllActiveAsync(bool trackChanges)
        {
            var item = await _repository.WorkOrderPriority
                .GetAllActiveAsync(trackChanges)
                .Select(x => _mapper.Map<WorkOrderPriorityDto>(x))
                .ToListAsync();

            return item;
        }

        public async Task<IEnumerable<WorkOrderPriorityDto>> GetAllAsync(bool trackChanges)
        {
            var item = await _repository.WorkOrderPriority
                .GetAllAsync(trackChanges, "Id")
                .Select(x => _mapper.Map<WorkOrderPriorityDto>(x))
                .ToListAsync();

            return item;
        }

        public async Task UpdateAsync(int id, WorkOrderPriorityDto newValue, bool trackChanges)
        {
            var toUpdate = await _repository.WorkOrderPriority
                .GetAsync(id, trackChanges)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("WorkOrderPriority not found");

            toUpdate.Name = newValue.Name;
            toUpdate.Description = newValue.Description;

            await _repository.SaveAsync();
        }
        public async Task DeleteAsync(int id)
        {
            var toUpdate = await _repository.WorkOrderPriority
                .GetAsync(id, true)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("WorkOrderPriority not found");

            toUpdate.IsActive = false;
            await _repository.SaveAsync();
        }
    }
}
