using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Exceptions;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Interfaces;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CarRent.Service.Service
{
    public class ClientDetailsService : ServiceBase, IGenericService<ClientDetailsDto>
    {
        public ClientDetailsService(IRepositoryManager repository, IMapper mapper) 
            : base(repository, mapper)
        {
        }

        public async Task<ClientDetailsDto> CreateAsync(ClientDetailsDto client)
        {
            var clientDetails = _mapper.Map<ClientDetails>(client);
            
            _repository.ClientDetails.Create(clientDetails);
            await _repository.SaveAsync();
            
            return _mapper.Map<ClientDetailsDto>(clientDetails);
        }

        public async Task<IEnumerable<ClientDetailsDto>> GetAllActiveAsync(bool trackChanges)
        {
            var clientDetails = await _repository.ClientDetails
                .GetAllActiveAsync(trackChanges)
                .Select(x => _mapper.Map<ClientDetailsDto>(x))
                .ToListAsync();

            return clientDetails;
        }

        public async Task<IEnumerable<ClientDetailsDto>> GetAllAsync(bool trackChanges)
        {
            var clientDetails = await _repository.ClientDetails
                .GetAllAsync(trackChanges, "Id")
                .Select(x => _mapper.Map<ClientDetailsDto>(x))
                .ToListAsync();

            return clientDetails;
        }

        public async Task<ClientDetailsDto> GetAsync(int id, bool trackChanges)
        {
            var clientDetails = await _repository.ClientDetails
                .GetAsync(id, trackChanges)
                .Select(x => _mapper.Map<ClientDetailsDto>(x))
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("ClientDetails not found");  

            return clientDetails;
        }

        public async Task UpdateAsync(int id, ClientDetailsDto newValue, bool trackChanges)
        {
            var clientDetails = await _repository.ClientDetails
                .GetAsync(id, trackChanges)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("ClientDetails not found");

            clientDetails.City = newValue.City;
            clientDetails.Address = newValue.Address;
            clientDetails.PhoneNumber = newValue.PhoneNumber;
            clientDetails.LastName = newValue.LastName;
            clientDetails.Email = newValue.Email;
            clientDetails.FirstName = newValue.FirstName;
            clientDetails.PostCode = newValue.PostCode;

            await _repository.SaveAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var clientDetails = await _repository.ClientDetails
                 .GetAsync(id, true)
                 .SingleOrDefaultAsync() ?? throw new DataNotFoundException("ClientDetails not found");

            clientDetails.IsActive = false;
            await _repository.SaveAsync();
        }
    }
}
