using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models
{
    public abstract class BaseDictionaryModel : BaseModel
    {
        public abstract int Id { get; set; }
    }
}
