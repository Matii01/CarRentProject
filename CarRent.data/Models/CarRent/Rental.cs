using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class Rental
    {
        [Key]
        public int Id { get; set; }
        
        public int CarId { get; set; }
        public Car Car { get; set; }

        public DateTime RentalStart { get; set; }
        public DateTime RentalEnd { get; set; }
        public decimal TotalRentalCost { get; set; }

    }
}
