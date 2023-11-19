using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class CarType : BaseDictionaryModel
    {
        public override int Id { get; set; }

        [Required]
        [MaxLength(32)]
        public string Name { get; set; } = null!;

    }
}
