using CarRent.data.Models.User;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class Rental : BaseModel
    {
        [Key]
        public int Id { get; set; }
        
        public bool HasUser {  get; set; }
        public Guid UserId { get; set; }
        public User.User? User { get; set; }
        public int CarId { get; set; }
        public Car Car { get; set; } = null!;
        public DateTime RentalStart { get; set; }
        public DateTime RentalEnd { get; set; }
        public decimal TotalRentalCost { get; set; }

    }
}
