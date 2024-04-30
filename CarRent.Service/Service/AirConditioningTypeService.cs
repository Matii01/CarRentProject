using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Exceptions;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Interfaces;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CarRent.Service.Service
{
    public class AirConditioningTypeService : ServiceBase, IGenericService<AirConditioningTypeDto>
    {
        public AirConditioningTypeService(IRepositoryManager repository, IMapper mapper) 
            : base(repository, mapper)
        {
        }

        public async Task<AirConditioningTypeDto> CreateAsync(AirConditioningTypeDto type)
        {
            var airConditionEntity = _mapper.Map<AirConditioningType>(type);

            _repository.AirConditioningType.Create(airConditionEntity);
            await _repository.SaveAsync();

            return _mapper.Map<AirConditioningTypeDto>(airConditionEntity);
        }

        public async Task<IEnumerable<AirConditioningTypeDto>> GetAllActiveAsync(bool trackChanges)
        {
            var airCondition = await _repository.AirConditioningType
                .GetAllActiveAsync(trackChanges)
                .Select(x => _mapper.Map<AirConditioningTypeDto>(x))
                .ToListAsync();

            return airCondition;
        }
        public async Task<IEnumerable<AirConditioningTypeDto>> GetAllAsync(bool trackChanges)
        {
            var airCondition = await _repository.AirConditioningType
                .GetAllAsync(trackChanges, "Name")
                .Select(x => _mapper.Map<AirConditioningTypeDto>(x))
                .ToListAsync();

            return airCondition;
        }

        public async Task<AirConditioningTypeDto> GetAsync(int id, bool trackChanges)
        {
            var airCondition = await _repository.AirConditioningType
                .GetAsync(id, trackChanges)
                .Select(x => _mapper.Map<AirConditioningTypeDto>(x))
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("AirConditioningType not found");

            return airCondition;
        }

        public async Task UpdateAsync(int id, AirConditioningTypeDto newValue, bool trackChanges)
        {
            var airCondition = await _repository.AirConditioningType
                .GetAsync(id, trackChanges)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("AirConditioningType not found");
            
            airCondition.Name = newValue.Name;

            await _repository.SaveAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var engineType = await _repository.AirConditioningType
                .GetAsync(id, true)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("AirConditioningType not found");
 
            engineType.IsActive = false;

            await _repository.SaveAsync();
        }
    }
}
