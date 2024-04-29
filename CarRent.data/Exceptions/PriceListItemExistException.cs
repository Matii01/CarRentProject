using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Exceptions
{
    public class PriceListItemExistException : BadRequestException
    {
        public PriceListItemExistException()
            : base("Price list item exists for a given number of days")
        {
        }
        public PriceListItemExistException(string message) 
            : base(message)
        {
        }
    }
}
