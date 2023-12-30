using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.Workers
{
    public class PathItem : BaseDictionaryModel
    {
        /* { name: "Użytkownicy", path: "/users/users" },*/
        public override int Id { get; set; }
        public int WorkerPathId { get; set; }
        public WorkerPaths? WorkerPath { get; set; }
        public string Name { get; set; } = null!;
        public string Path { get; set; } = null!;
        public int Position { get; set; }
    }
}
