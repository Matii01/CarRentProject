using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Interfaces;
using CarRent.Service.Interfaces;

namespace CarRent.Service.Service
{
    public class EngineTypeService : ServiceBase, IGenericService<EngineTypeDto>
    {
        public EngineTypeService(IRepositoryManager repository, IMapper mapper) 
            : base(repository, mapper)
        {
        }

        public async Task<EngineTypeDto> CreateAsync(EngineTypeDto engineType)
        {
            var engineTypeEntity = _mapper.Map<EngineType>(engineType);

            _repository.EngineType.Create(engineTypeEntity);
            await _repository.SaveAsync();

            return _mapper.Map<EngineTypeDto>(engineType);
        }

        public async Task<IEnumerable<EngineTypeDto>> GetAllActiveAsync(bool trackChanges)
        {
            var engineTypes = await _repository.EngineType.GetAllActiveAsync(trackChanges);

            var engineTypesDto = engineTypes.Select(_mapper.Map<EngineTypeDto>).ToList();
            return engineTypesDto;
        }

        public async Task<IEnumerable<EngineTypeDto>> GetAllAsync(bool trackChanges)
        {
            var engineTypes = await _repository.EngineType.GetAllAsync(trackChanges, "Name");

            var engineTypesDto = engineTypes.Select(_mapper.Map<EngineTypeDto>).ToList();
            return engineTypesDto;
        }

        public async Task<EngineTypeDto> GetAsync(int id, bool trackChanges)
        {
            var engineType = await _repository.EngineType.GetAsync(id, trackChanges);
            return _mapper.Map<EngineTypeDto>(engineType);
        }

        public async Task UpdateAsync(int id, EngineTypeDto newEngineType, bool trackChanges)
        {
            var engineType = await _repository.EngineType.GetAsync(id, trackChanges) ?? throw new ArgumentException("not found");
            engineType.Name = newEngineType.Name;

            await _repository.SaveAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var engineType = await _repository.EngineType.GetAsync(id, true) ?? throw new ArgumentException("not found");
            engineType.IsActive = false;

            await _repository.SaveAsync();
        }
    }
}
