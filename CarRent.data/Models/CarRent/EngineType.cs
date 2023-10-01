using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class EngineType : BaseModel
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(32)]
        public string Name { get; set; } = null!;

    }
}
