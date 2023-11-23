using AutoMapper;
using CarRent.data.DTO;
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
    public class RabatService : ServiceBase, IRabatInterface
    {
        public RabatService(IRepositoryManager repository, IMapper mapper) 
            : base(repository, mapper)
        {
        }

        public async Task<IEnumerable<RabatDto>> GetCurrentRabat()
        {
            var rabats = await _repository.Rabat
                .FindByCondition(x => x.IsActive == true, false)
                .Select(x => new RabatDto())
                .ToArrayAsync();

            return rabats;
        }
    }
}
