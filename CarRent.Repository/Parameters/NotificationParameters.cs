using CarRent.data.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Parameters
{
    public class NotificationParameters : RequestParameters
    {
        public string? UserId { get; set; }
        public DateTime? CreatedStart { get; set; }
        public DateTime? CreatedEnd { get; set; }
        public bool? IsRead { get; set; }
    }
}
