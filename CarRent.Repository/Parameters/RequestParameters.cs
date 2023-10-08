using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Parameters
{
    public abstract class RequestParameters
    {
        const int maxPageSize = 50; // max items on page
        public int PageNumber { get; set; } = 1;

        private int _pageSize = 10;

        public int PageSize
        {
            get { return _pageSize = 10; }
            set { _pageSize = (value > maxPageSize) ? maxPageSize : value; }
        }

        public string? OrderBy {  get; set; }
        public string? Fields {  get; set; }
    }
}
