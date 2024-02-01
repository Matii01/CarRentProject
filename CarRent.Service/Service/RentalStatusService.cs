using AutoMapper;
using CarRent.data.DTO;
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
    public class RentalStatusService : IGenericService<RentalStatusDto>
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _repository;

        public RentalStatusService(IRepositoryManager repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<RentalStatusDto> CreateAsync(RentalStatusDto type)
        {
            var rentalStatus = _mapper.Map<RentalStatus>(type);

            _repository.RentalStatus.Create(rentalStatus);
            await _repository.SaveAsync();

            return _mapper.Map<RentalStatusDto>(rentalStatus);
        }

        public async Task<IEnumerable<RentalStatusDto>> GetAllActiveAsync(bool trackChanges)
        {
            var rentalStatus = await _repository.RentalStatus
                .GetAllActiveAsync(trackChanges)
                .Select(x => _mapper.Map<RentalStatusDto>(x))
                .ToListAsync();

            return rentalStatus;
        }

        public async Task<IEnumerable<RentalStatusDto>> GetAllAsync(bool trackChanges)
        {
            var rentalStatus = await _repository.RentalStatus
                .GetAllAsync(trackChanges, "Id")
                .Select(x => _mapper.Map<RentalStatusDto>(x))
                .ToListAsync();

            return rentalStatus;
        }

        public async Task<RentalStatusDto> GetAsync(int id, bool trackChanges)
        {
            var rentalStatus = await _repository.RentalStatus
               .GetAsync(id, trackChanges)
               .Select(x => _mapper.Map<RentalStatusDto>(x))
               .SingleOrDefaultAsync();

            return rentalStatus ?? throw new Exception("Rental status not found");
        }

        public async Task UpdateAsync(int id, RentalStatusDto newValue, bool trackChanges)
        {
            var rentalStatus = await _repository.RentalStatus
                .GetAsync(id, trackChanges)
                .SingleOrDefaultAsync() ?? throw new ArgumentException("Rental Status not found");

            rentalStatus.Status = newValue.Status;
            rentalStatus.Remarks = newValue.Remarks;
            rentalStatus.IsDefault = newValue.IsDefault;

            await _repository.SaveAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var rentalStatus = await _repository.RentalStatus
                .GetAsync(id, true)
                .SingleOrDefaultAsync() ?? throw new ArgumentException("not found");
            rentalStatus.IsActive = false;

            await _repository.SaveAsync();
        }
    }
}
