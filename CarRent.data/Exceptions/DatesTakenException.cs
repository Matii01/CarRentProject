using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Exceptions
{
    public class DatesTakenException : BadRequestException
    {
        public DatesTakenException()
            : base("Selected dates are taken")
        {
        }
    }
}
