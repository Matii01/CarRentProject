using AutoMapper;
using CarRent.data.DTO;
using CarRent.Repository.Interfaces;
using CarRent.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Service
{
    public class CarOpinionService : ServiceBase, ICarOpinionService
    {
        public CarOpinionService(IRepositoryManager repository, IMapper mapper) 
            : base(repository, mapper)
        {
        }

        public Task AddOpinionAsync(OpinionDto opinion)
        {
            throw new NotImplementedException();
        }

        public Task DeleteOpinionAsync(int Id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<OpinionDto>> GetOpinionsForCarAsync(int carId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<OpinionDto>> GetOpinionsUserForCarAsync()
        {
            throw new NotImplementedException();
        }

        public Task HideOpinionAsync(int Id)
        {
            throw new NotImplementedException();
        }
    }
}
