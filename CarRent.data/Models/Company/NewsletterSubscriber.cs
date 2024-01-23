using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.Company
{
    public class NewsletterSubscriber : BaseDictionaryModel
    {
        public override int Id { get; set; }
        public string Email { get; set; } = null!;
        public DateTime? SubscribeDate { get; set; }
        public DateTime? UnsubscribeDate { get; set; }
        public bool? IsSubscribe { get; set;}
    }
}
