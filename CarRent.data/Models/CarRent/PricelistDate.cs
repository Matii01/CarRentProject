using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class PricelistDate : BaseDictionaryModel
    {
        [Key]
        public override int Id { get; set; }

        public int PriceListId {  get; set; }
        public PriceList? PriceList { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }

    }
}
