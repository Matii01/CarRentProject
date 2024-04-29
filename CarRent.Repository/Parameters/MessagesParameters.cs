using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Parameters
{
    public class MessagesParameters : RequestParameters
    {
        public string? Name {  get; set; }
        public string? Email {  get; set; }
        public DateTime? CreatedStart { get; set; }
        public DateTime? CreatedEnd { get; set; }
        public DateTime? AnsweredStart { get; set; }
        public DateTime? AnsweredEnd { get; set; }
        public bool? IsAnswered { get; set; }
    }
}
