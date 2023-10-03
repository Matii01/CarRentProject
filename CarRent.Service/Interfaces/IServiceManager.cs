using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface IServiceManager
    {
        ICarMakeService CarMakeService { get; }
        IGenericService<CarTypeDto> CarTypeService { get; }
    }
}
