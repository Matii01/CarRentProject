using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class RecommendedCars : BaseDictionaryModel
    {
        public override int Id { get; set; }
        public int CarId {  get; set; }
        public Car Car { get; set; } = null!;
        public DateTime? AddedData { get; set; }
    }
}
