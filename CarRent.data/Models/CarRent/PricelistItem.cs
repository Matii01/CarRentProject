using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class PricelistItem : BaseDictionaryModel
    {
        [Key]
        public override int Id { get; set; }

        public int PriceListId {  get; set; }
        public PriceList PriceList { get; set; } = null!;

        [Required]
        [Range(0, int.MaxValue)]
        public int Days {  get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        [Precision(18, 2)]
        public decimal Price { get; set; }

        [NotMapped]
        public override string SortBy { get; set; } = "Id";
    }
}
