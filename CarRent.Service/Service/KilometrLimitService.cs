using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Exceptions;
using CarRent.data.Models.CarRent;
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
    public class KilometrLimitService : ServiceBase, IGenericService<KilometrLimitDto>
    {
        public KilometrLimitService(IRepositoryManager repository, IMapper mapper) 
            : base(repository, mapper)
        {
        }

        public async Task<KilometrLimitDto> CreateAsync(KilometrLimitDto kilometrLimit)
        {
            var kilometrLimitEntity = _mapper.Map<KilometrLimit>(kilometrLimit);

            _repository.KilometrLimit.Create(kilometrLimitEntity);
            await _repository.SaveAsync();

            return _mapper.Map<KilometrLimitDto>(kilometrLimitEntity);
        }

        public async Task<IEnumerable<KilometrLimitDto>> GetAllActiveAsync(bool trackChanges)
        {
            var kilometrLimit = await _repository.KilometrLimit
                .GetAllActiveAsync(trackChanges)
                .Select(x => _mapper.Map<KilometrLimitDto>(x))
                .ToListAsync();

            return kilometrLimit;
        }

        public async Task<IEnumerable<KilometrLimitDto>> GetAllAsync(bool trackChanges)
        {
            var kilometrLimit = await _repository.KilometrLimit
                .GetAllAsync(trackChanges, "LimitValue")
                .Select(x => _mapper.Map<KilometrLimitDto>(x))
                .ToListAsync();

            return kilometrLimit;
        }

        public async Task<KilometrLimitDto> GetAsync(int id, bool trackChanges)
        {
            var kilometrLimit = await _repository.KilometrLimit
                .GetAsync(id, trackChanges)
                .Select(x => _mapper.Map<KilometrLimitDto>(x))
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("KilometrLimit not found"); 
            
            return kilometrLimit;
        }

        public async Task UpdateAsync(int id, KilometrLimitDto newValue, bool trackChanges)
        {
            var kilometrLimit = await _repository.KilometrLimit
                .GetAsync(id, trackChanges)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("KilometrLimit not found");
            kilometrLimit.LimitValue = newValue.LimitValue;

            await _repository.SaveAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var engineType = await _repository.KilometrLimit
                .GetAsync(id, true)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("KilometrLimit not found");
            engineType.IsActive = false;

            await _repository.SaveAsync();
        }
    }
}
