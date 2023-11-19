using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class KilometrLimit : BaseDictionaryModel
    {
        public override int Id { get; set; }

        [Required]
        [MaxLength(64)]
        [Precision(18, 2)]
        public decimal LimitValue { get; set; }

    }
}
