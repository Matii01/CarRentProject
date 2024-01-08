using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.User
{
    public class Wishlist : BaseDictionaryModel
    {
        public override int Id { get; set; }
        public int CarId { get; set; }
        public Car? Car { get; set; }
        public string UserId { get; set; } = null!;
    }
}
