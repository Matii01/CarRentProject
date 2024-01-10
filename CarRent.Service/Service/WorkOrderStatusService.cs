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
    public class WorkOrderStatusService : ServiceBase, IGenericService<WorkOrderStatusDto>
    {
        public WorkOrderStatusService(IRepositoryManager repository, IMapper mapper) 
            : base(repository, mapper)
        {
        }

        public async Task<WorkOrderStatusDto> CreateAsync(WorkOrderStatusDto type)
        {
            var newValue = _mapper.Map<WorkOrderStatus>(type);

            _repository.WorkOrderStatus.Create(newValue);
            await _repository.SaveAsync();

            return _mapper.Map<WorkOrderStatusDto>(newValue);
        }

        public async Task<WorkOrderStatusDto> GetAsync(int id, bool trackChanges)
        {
            var item = await _repository.WorkOrderStatus
                .GetAsync(id, trackChanges)
                .Select(x => _mapper.Map<WorkOrderStatusDto>(x))
                .SingleOrDefaultAsync();

            return item;
        }

        public async Task<IEnumerable<WorkOrderStatusDto>> GetAllActiveAsync(bool trackChanges)
        {
            var item = await _repository.WorkOrderStatus
                .GetAllActiveAsync(trackChanges)
                .Select(x => _mapper.Map<WorkOrderStatusDto>(x))
                .ToListAsync();

            return item;
        }

        public async Task<IEnumerable<WorkOrderStatusDto>> GetAllAsync(bool trackChanges)
        {
            var item = await _repository.WorkOrderStatus
                .GetAllAsync(trackChanges, "Id")
                .Select(x => _mapper.Map<WorkOrderStatusDto>(x))
                .ToListAsync();

            return item;
        }

        public async Task UpdateAsync(int id, WorkOrderStatusDto newValue, bool trackChanges)
        {
            var toUpdate = await _repository.WorkOrderStatus
                .GetAsync(id, trackChanges)
                .SingleOrDefaultAsync() ?? throw new ArgumentException("not found");

            toUpdate.Name = newValue.Name;
            toUpdate.Description = newValue.Description;

            await _repository.SaveAsync();
        }
        public async Task DeleteAsync(int id)
        {
            var toUpdate = await _repository.WorkOrderStatus
                .GetAsync(id, true)
                .SingleOrDefaultAsync() ?? throw new ArgumentException("not found");

            toUpdate.IsActive = false;
            await _repository.SaveAsync();
        }
    }
}
