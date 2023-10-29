using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.Auth
{
    /// <summary>
    /// Class that hold JWT settings
    /// </summary>
    public class JwtSettings
    {
        public string Secret { get; set; } = null!;
        public string ValidIssuer { get; set; } = null!;
        public string ValidAudience { get; set; } = null!;
        public int Expires { get; set; }    
    }
}
