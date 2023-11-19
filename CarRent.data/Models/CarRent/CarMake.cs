﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class CarMake : BaseDictionaryModel
    {
        public override int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }

    }
}
