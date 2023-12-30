using CarRent.data.Models.CarRent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.Workers
{
    public class UserWorkerPaths : BaseDictionaryModel
    {
        public override int Id { get; set; }
        public int WorkerPathsId { get; set; }
        public WorkerPaths WorkerPaths { get; set; } = null!;
        public string? UserAccountId { get; set; }
        public User.User User { get; set; } = null!;
    }
}
