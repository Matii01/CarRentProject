using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class CarMaintenance : BaseDictionaryModel
    {
        [Key]
        public override int Id { get; set; }
        public int CarId { get; set; }
        public Car Car { get; set; } = null!;

        public string? UserId { get; set; }
        public User.User Worker { get; set; } = null!;

        public string Description { get; set; } = null!;
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }

        [Precision(18, 2)]
        [Range(0, double.MaxValue)]
        public decimal TotalCost { get; set; }
    }
}
