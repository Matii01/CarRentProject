using CarRent.data.Models.User;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CarRent
{
    public class CarOpinion : BaseDictionaryModel
    {
        public override int Id { get; set; }
        public string? Title {  get; set; }
        public string? Text { get; set; }

        public DateTime? AddedDate { get; set; }
        public bool? IsAccepted { get; set; }

        [Range(1, 6)]
        public int Mark {  get; set; }
        public string? UserId { get; set; }
        public User.User? User { get; set; }
        public int CarId {  get; set; }
        public Car? Car { get; set; }
    }
}
