using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Parameters
{
    public class CarParameters : RequestParameters
    {
        public string? GearboxType { get; set; }
        public string? ACType { get; set; }
        public string? EngineType { get; set; }
        public string? CarDrive { get; set; }
        public double Acceleration {  get; set; }


    }
}
