using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.Company
{
    public class SendHistory : BaseDictionaryModel
    {
        public override int Id { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? Title { get; set; }
        public string? Message { get; set; }
    }
}
