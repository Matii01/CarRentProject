using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class CarDrive : BaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;

        [MaxLength(64)]
        public string? Description { get; set; }
    }
}
