using AutoMapper;
using CarRent.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Service
{
    public class RentalService : ServiceBase
    {
        public RentalService(IRepositoryManager repository, IMapper mapper) 
            : base(repository, mapper)
        {
        }
    }
}
