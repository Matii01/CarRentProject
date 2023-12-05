using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Parameters
{
    public class CarParameters : RequestParameters
    {
        public int? GearboxTypeId { get; set; }
        public int? ACTypeId { get; set; }
        public int? EngineTypeId { get; set; }
        public int? CarTypeId { get; set; }
        public int[]? MakeId {  get; set; }
        public double? PriceMin { get; set; }
        public double? PriceMax { get; set; }
        public int? MinSeatsNum { get; set; }
    }
}
