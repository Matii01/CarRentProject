using Microsoft.EntityFrameworkCore;
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

        public static async Task<PagedList<T>> ToPagedList(IQueryable<T> items, int pageNumber, int pageSize)
        {
            var count = await items.CountAsync();
            var it = await items.Skip((pageNumber -1) * pageSize)
                .Take(pageSize).ToListAsync();


            return new PagedList<T>(it, count, pageNumber, pageSize);
        }
    }
}
