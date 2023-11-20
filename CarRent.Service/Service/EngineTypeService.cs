﻿using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Interfaces;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

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
            var engineTypes = await _repository.EngineType
                .GetAllActiveAsync(trackChanges)
                .Select(x => _mapper.Map<EngineTypeDto>(x))
                .ToListAsync();

            return engineTypes;
        }

        public async Task<IEnumerable<EngineTypeDto>> GetAllAsync(bool trackChanges)
        {
            var engineTypes = await _repository.EngineType
                .GetAllAsync(trackChanges, "Name")
                .Select(x => _mapper.Map<EngineTypeDto>(x))
                .ToListAsync();

            return engineTypes;
        }

        public async Task<EngineTypeDto> GetAsync(int id, bool trackChanges)
        {
            var engineType = await _repository.EngineType
                .GetAsync(id, trackChanges)
                .Select(x => _mapper.Map<EngineTypeDto>(x))
                .SingleOrDefaultAsync();
        
            return engineType;
        }

        public async Task UpdateAsync(int id, EngineTypeDto newEngineType, bool trackChanges)
        {
            var engineType = await _repository.EngineType
                .GetAsync(id, trackChanges)
                .SingleOrDefaultAsync() ?? throw new ArgumentException("not found");
            engineType.Name = newEngineType.Name;

            await _repository.SaveAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var engineType = await _repository.EngineType
                .GetAsync(id, true)
                .SingleOrDefaultAsync() ?? throw new ArgumentException("not found");
            engineType.IsActive = false;

            await _repository.SaveAsync();
        }
    }
}
