using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Exceptions;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Interfaces;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CarRent.Service.Service
{
    public class GearboxTypeService : ServiceBase, IGenericService<GearboxTypeDto>
    {
        public GearboxTypeService(IRepositoryManager repository, IMapper mapper) 
            : base(repository, mapper)
        {
        }

        public async Task<GearboxTypeDto> CreateAsync(GearboxTypeDto gearbox)
        {
            var gearboxEntity = _mapper.Map<GearboxType>(gearbox);

            _repository.GearboxType.Create(gearboxEntity);
            await _repository.SaveAsync();

            return _mapper.Map<GearboxTypeDto>(gearboxEntity);
        }

        public async Task<IEnumerable<GearboxTypeDto>> GetAllActiveAsync(bool trackChanges)
        {
            var gearbox = await _repository.GearboxType
                .GetAllActiveAsync(trackChanges)
                .Select(x => _mapper.Map<GearboxTypeDto>(x))
                .ToListAsync();

            return gearbox;
        }

        public async Task<IEnumerable<GearboxTypeDto>> GetAllAsync(bool trackChanges)
        {
            var gearbox = await _repository.GearboxType
                .GetAllAsync(trackChanges, "Name")
                .Select(x => _mapper.Map<GearboxTypeDto>(x))
                .ToListAsync();

            return gearbox;
        }

        public async Task<GearboxTypeDto> GetAsync(int id, bool trackChanges)
        {
            var gearbox = await _repository.GearboxType
                .GetAsync(id, trackChanges)
                .Select(x => _mapper.Map<GearboxTypeDto>(x))
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("GearboxType not found");

            return gearbox;
        }

        public async Task UpdateAsync(int id, GearboxTypeDto newValue, bool trackChanges)
        {
            var gearbox = await _repository.GearboxType
                .GetAsync(id, trackChanges)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("GearboxType not found");
            gearbox.Name = newValue.Name;

            await _repository.SaveAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var engineType = await _repository.GearboxType
                .GetAsync(id, true)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("GearboxType not found");
            engineType.IsActive = false;

            await _repository.SaveAsync();
        }
    }
}
