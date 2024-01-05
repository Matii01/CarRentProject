using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CMS
{
    public class ContactPage : BaseDictionaryModel
    {
        public override int Id { get; set; }
        public string? PageTitle { get; set; }
        public string? PageDescription { get; set; }

        public string? AddressTitle { get; set; }
        public string? AddressIcon { get; set; }
        public string? AddressDetails { get; set; }

        public string? PhoneTitle { get; set; }
        public string? PhoneIcon { get; set; }
        public string? PhoneDetails { get; set; }
        public string? PhoneNumber { get; set; }


        public string? EmailTitle { get; set; }
        public string? EmailIcon { get; set; }
        public string? EmailAddress { get; set; }


        public string? ContactSectionTitle { get; set;}
        public string? TextRowOne { get; set;}
        public string? TextRowTwo { get; set;}

    }
}
