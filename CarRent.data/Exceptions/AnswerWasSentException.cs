using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Exceptions
{
    public class AnswerWasSentException : BadRequestException
    {
        public AnswerWasSentException() 
            : base("the answer was sent earlier")
        {
        }
    }
}
