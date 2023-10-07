using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class KilometrLimit : BaseModel
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(64)]
        [Precision(18, 2)]
        public decimal LimitValue { get; set; }
    }
}
