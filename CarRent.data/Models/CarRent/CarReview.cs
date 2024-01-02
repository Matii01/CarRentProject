using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class CarReview : BaseDictionaryModel
    {
        public override int Id { get; set; }

        public int CarId { get; set; }
        public Car Car { get; set; } = null!;
        public string UserId { get; set; } = null!;
        public string UserName { get; set; } = null!;

        [Range(1, 6)]
        public int Rating { get; set; }
        public string? ReviewText { get; set; }
        public bool IsAccepted {  get; set; }
    }
}
