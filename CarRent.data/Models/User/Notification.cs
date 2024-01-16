using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.User
{
    public class Notification : BaseDictionaryModel
    {
        public override int Id { get; set; }
        public string? UserId { get; set; }
        public User? User { get; set; }
        public string? Title { get; set; }
        public string? Message { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ReadDate { get; set; }
        public bool? IsRead { get; set; }
    }
}
