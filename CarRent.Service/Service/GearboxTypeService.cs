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
            var gearbox = await _repository.GearboxType.GetAllActiveAsync(trackChanges);

            var gearboxDto = gearbox.Select(_mapper.Map<GearboxTypeDto>).ToList();
            return gearboxDto;
        }

        public async Task<IEnumerable<GearboxTypeDto>> GetAllAsync(bool trackChanges)
        {
            var gearbox = await _repository.GearboxType.GetAllAsync(trackChanges);

            var gearboxDto = gearbox.Select(_mapper.Map<GearboxTypeDto>).ToList();
            return gearboxDto;
        }

        public async Task<GearboxTypeDto> GetAsync(int id, bool trackChanges)
        {
            var gearbox = await _repository.GearboxType.GetAsync(id, trackChanges);
            return _mapper.Map<GearboxTypeDto>(gearbox);
        }

        public async Task UpdateAsync(int id, GearboxTypeDto newValue, bool trackChanges)
        {
            var gearbox = await _repository.GearboxType.GetAsync(id, trackChanges) ?? throw new ArgumentException("not found");
            gearbox.Name = newValue.Name;

            await _repository.SaveAsync();
        }
    }
}
