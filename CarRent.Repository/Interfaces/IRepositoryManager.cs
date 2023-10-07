using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CarRent.Repository.Interfaces.CarInterfaces;

namespace CarRent.Repository.Interfaces
{
    public interface IRepositoryManager
    {
        ICarMakeRepository CarMake { get; }
        ICarTypeRepository CarType { get; }
        Task SaveAsync();
    }
}
