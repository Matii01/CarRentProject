using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Exceptions
{
    public class RabatRangeBadRequest : BadRequestException
    {
        public RabatRangeBadRequest() 
            : base("Rabat must be in the range of 1 - 50")
        {
        }
    }
}
