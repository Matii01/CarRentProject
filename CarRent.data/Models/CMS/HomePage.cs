﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CMS
{
    public class HomePage : BaseDictionaryModel
    {
        public override int Id { get; set; }
        public string? HomePageImage { get; set; }
        public string? HomePageTitle { get; set; }
        public string? HomePageTextOne { get; set; }
        public string? HomePageTextTwo { get; set; }
    }
}
