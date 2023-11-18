using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class UserRental
    {
        public int Id { get; set; }
        public int RentalId { get; set; }
        public Rental Rental { get; set; } = null!;
        public Guid UserId { get; set; }
        public User.User User { get; set; }

    }
}
