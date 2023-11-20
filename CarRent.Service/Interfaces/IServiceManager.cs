﻿using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using CarRent.Service.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface IServiceManager
    {
        ICarService CarService { get; }
        ICarMakeService CarMakeService { get; }
        IPriceListService PriceListService { get; }
        IRentalService RentalService { get; }  

        IGenericService<CarTypeDto> CarTypeService { get; }
        IGenericService<CarDriveDto> CarDriveService { get; }
        IGenericService<EngineTypeDto> EngineTypeService { get; }
        IGenericService<AirConditioningTypeDto> AirConditioningTypeService { get; }
        IGenericService<KilometrLimitDto> KilometrLimitService { get; }
        IGenericService<GearboxTypeDto> GearboxTypeService { get; }
        
    }
}
