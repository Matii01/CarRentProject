using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Exceptions;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Interfaces;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;
 
namespace CarRent.Service.Service
{
    public class InvoiceStatusService : IGenericService<InvoiceStatusDto>
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _repository;

        public InvoiceStatusService(IRepositoryManager repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<InvoiceStatusDto> CreateAsync(InvoiceStatusDto type)
        {
            var status = _mapper.Map<InvoiceStatus>(type);

            _repository.InvoiceStatus.Create(status);
            await _repository.SaveAsync();

            return _mapper.Map<InvoiceStatusDto>(status);
        }

        public async Task<IEnumerable<InvoiceStatusDto>> GetAllActiveAsync(bool trackChanges)
        {
            var status = await _repository.InvoiceStatus
                .GetAllActiveAsync(trackChanges)
                .Select(x => _mapper.Map<InvoiceStatusDto>(x))
                .ToListAsync();

            return status;
        }

        public async Task<IEnumerable<InvoiceStatusDto>> GetAllAsync(bool trackChanges)
        {
            var status = await _repository.InvoiceStatus
                .GetAllAsync(trackChanges, "Id")
                .Select(x => _mapper.Map<InvoiceStatusDto>(x))
                .ToListAsync();

            return status;
        }

        public async Task<InvoiceStatusDto> GetAsync(int id, bool trackChanges)
        {
            var status = await _repository.InvoiceStatus
               .GetAsync(id, trackChanges)
               .Select(x => _mapper.Map<InvoiceStatusDto>(x))
               .SingleOrDefaultAsync();
           
            return status ?? throw new DataNotFoundException("Rental status not found");
        }

        public async Task UpdateAsync(int id, InvoiceStatusDto newValue, bool trackChanges)
        {
            var status = await _repository.InvoiceStatus
                .GetAsync(id, trackChanges)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("Rental status not found");

            status.Name = newValue.Name;
            status.Description = newValue.Description;

            await _repository.SaveAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var status = await _repository.InvoiceStatus
                .GetAsync(id, true)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("Rental status not found");
            status.IsActive = false;

            await _repository.SaveAsync();
        }
    }
}
