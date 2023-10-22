using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Parameters
{
    public class PagedList<T> //: List<T> where T : class
    {
        public PageData MetaData { get; set; }
        public List<T> Items { get; set; }

        public PagedList(List<T> items, int count, int pageNumber, int pageSize) 
        {
            Items = items;
            MetaData = new PageData
            {
                TotalCount = count,
                PageSize = pageSize,
                CurrentPage = pageNumber,
                TotalPages = (int)Math.Ceiling(count / (double)pageSize)
            };
            //AddRange(items);
        }

        public static PagedList<T> ToPagedList(IEnumerable<T> items, int pageNumber, int pageSize)
        {
            var count = items.Count();
            var it = items.Skip((pageNumber -1) * pageSize)
                .Take(pageSize).ToList();


            return new PagedList<T>(it, count, pageNumber, pageSize);
        }
    }
}
