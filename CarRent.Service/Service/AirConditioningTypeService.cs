using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Interfaces;
using CarRent.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
            var airCondition = await _repository.AirConditioningType.GetAllActiveAsync(trackChanges);

            var airConditionDto = airCondition.Select(_mapper.Map<AirConditioningTypeDto>).ToList();
            return airConditionDto;
        }
        public async Task<IEnumerable<AirConditioningTypeDto>> GetAllAsync(bool trackChanges)
        {
            var airCondition = await _repository.AirConditioningType.GetAllAsync(trackChanges);

            var airConditionDto = airCondition.Select(_mapper.Map<AirConditioningTypeDto>).ToList();
            return airConditionDto;
        }

        public async Task<AirConditioningTypeDto> GetAsync(int id, bool trackChanges)
        {
            var airCondition = await _repository.AirConditioningType.GetAsync(id, trackChanges);
            return _mapper.Map<AirConditioningTypeDto>(airCondition);
        }

        public async Task UpdateAsync(int id, AirConditioningTypeDto newValue, bool trackChanges)
        {
            var airCondition = await _repository.AirConditioningType.GetAsync(id, trackChanges) ?? throw new ArgumentException("not found");
            airCondition.Name = newValue.Name;

            await _repository.SaveAsync();
        }
    }
}
