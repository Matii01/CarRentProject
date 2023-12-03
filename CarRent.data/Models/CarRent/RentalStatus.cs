using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class RentalStatus : BaseDictionaryModel
    {
        [Key]
        public override int Id { get; set; }
        public string Status { get; set; } = null!;
        public string? Remarks { get; set; } 
        public bool? IsDefault { get; set; }
    }
}
