using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class RabatForUser : BaseDictionaryModel
    {
        [Key]
        public override int Id { get; set; }
        public string? UserAccountId { get; set; }

        public string? Title { get; set; }

        [Precision(18,2)]
        [Range(1, 100)]
        public decimal RabatPercentValue { get; set; }

        public  DateTime? DateOfExpiration { get; set;}

        public bool IsUsed { get; set; }
    }
}
