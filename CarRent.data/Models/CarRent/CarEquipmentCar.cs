using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class CarEquipmentCar : BaseDictionaryModel
    {
        public override int Id {  get; set; }
        public int CarEquipmentId { get; set; }
        public int CarId { get; set; }
        public CarEquipment CarEquipment { get; set; } = null!;
        public Car Car { get; set; } = null!;
    }
}
