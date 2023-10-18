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
        public string? CarType { get; set; }
        public string? Make {  get; set; }
        public double? PriceMin { get; set; }
        public double? PriceMax { get; set; }
        public int? MinSeatsNum { get; set; }
    }
}
