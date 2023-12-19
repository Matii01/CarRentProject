using CarRent.data.Models.CarRent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.User
{
    public class UserAddress : BaseDictionaryModel
    {
        public override int Id { get; set; }
        public int AddressId { get; set; }
        public Address Address { get; set; } = null!;
        public string? UserAccountId { get; set; }
        public User User { get; set; } = null!;
    }
}
