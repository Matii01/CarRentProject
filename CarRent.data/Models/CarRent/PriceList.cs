using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class PriceList : BaseDictionaryModel
    {
        [Key]
        public override int Id { get; set; }
        public string? Name { get; set; }
        public int CarId { get; set; }
        public Car Car { get; set; } = null!;
        public bool? IsDefault {  get; set; }
        public ICollection<PricelistDate> PricelistDates { get;} = new List<PricelistDate>();
        public ICollection<PricelistItem> PricelistItems { get;} = new List<PricelistItem>();
    }
}
