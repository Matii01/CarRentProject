using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Exceptions
{
    public class UserHaveRabatException : BadRequestException
    {
        public UserHaveRabatException()
            : base("User has an active discount")
        {
        }
    }
}
