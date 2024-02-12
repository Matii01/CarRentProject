using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.Company
{
    public class Message : BaseDictionaryModel
    {
        public override int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string MessageText { get; set; } = null!;
        public string? WhoAnswerId { get; set; } = null!;
        public string? WhoAnswerName { get; set; } = null!;
        public string? AnswerText { get; set; } = null!;
        public DateTime CreatedDate { get; set; } 
        public DateTime? AnsweredDate { get; set;}
        public bool IsAnswered { get; set; }
    }
}
