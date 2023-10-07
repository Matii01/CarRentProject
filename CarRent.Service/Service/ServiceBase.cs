using AutoMapper;
using CarRent.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Service
{
    public class ServiceBase
    {
        protected readonly IRepositoryManager _repository;
        protected readonly IMapper _mapper;

        public ServiceBase(IRepositoryManager repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
    }
}
