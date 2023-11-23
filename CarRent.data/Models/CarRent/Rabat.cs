using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class Rabat : BaseDictionaryModel
    {
        [Key]
        public override int Id { get; set; }

        [Precision(18, 2)]
        [Range(1, 100)]
        public decimal RabatPercentValue {  get; set; }
        public int CarId { get; set; }
        public Car? Car { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
    }
}
