using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class CarEquipment : BaseDictionaryModel
    {
        public override int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }

        public List<CarEquipmentCar> CarEquipmentCars { get; } = new();
        public List<Car> Cars { get; } = new();

    }
}
