using CarRent.Repository.Interfaces;
using CarRent.Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly CarRentContext _context;
        private readonly Lazy<ICarMakeRepository> _carMakeRepository;
        private readonly Lazy<ICarTypeRepository> _carTypeRepository;

        public RepositoryManager(CarRentContext context)
        {
            _context = context;

            _carMakeRepository = new Lazy<ICarMakeRepository>(() =>
                new CarMakeRepository(_context));

            _carTypeRepository = new Lazy<ICarTypeRepository>(() => 
                new CarTypeRepository(_context));
        }

        public ICarMakeRepository CarMake => _carMakeRepository.Value;
        public ICarTypeRepository CarType => _carTypeRepository.Value;

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
