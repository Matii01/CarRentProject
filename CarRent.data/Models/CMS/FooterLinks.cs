﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CMS
{
    public class FooterLinks : BaseDictionaryModel
    {
        public override int Id { get; set; }
        public string Title { get; set; } = null!;
        public int FooterId {  get; set; }
        public Footer Footer { get; set; } = null!;
        public IEnumerable<FooterLinksPaths> Paths { get; set; } = new List<FooterLinksPaths>();
    }
}
