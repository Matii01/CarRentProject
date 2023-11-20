using CarRent.data.Models;
using CarRent.Repository.Abstract;
using CarRent.Repository.Extensions;
using CarRent.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Repositories
{

    // ToDo delete all ToAsync method 
    public class GenericRepository<T> : RepositoryBase<T>, IGenericRepository<T> where T : BaseDictionaryModel
    {
        public GenericRepository(CarRentContext context) : base(context)
        {
        }

        public IQueryable<T> GetAllAsync(bool trackChanges, string sortByProperty)
        {
            var query = All(trackChanges);
           
            
            if (!string.IsNullOrEmpty(sortByProperty) && typeof(T).GetProperty(sortByProperty) != null)
            {
                query = query.OrderByField(sortByProperty, true);
            }

            return query;
        }

        public IQueryable<T> GetAllActiveAsync(bool trackChanges)
        {
            return FindByCondition(x => x.IsActive == true, trackChanges);
        }

        public IQueryable<T> GetAsync(int id, bool trackChanges)
        {
            return FindByCondition(x => x.Id == id, trackChanges);
        }

        //public async Task DeleteAsync(int id)
        //{
        //
        //}
    }
}


/*
  public async Task<IEnumerable<T>> GetAllAsync(bool trackChanges)
        {
            var query = All(trackChanges);

            if (!string.IsNullOrEmpty(typeof(T).GetProperty(typeof(T).BaseType.GetProperty("SortBy").GetValue(null).ToString())))
            {
                query = query.OrderBy(x => x.GetType().GetProperty(typeof(T).GetProperty("SortBy").GetValue(null).ToString()).GetValue(x));
            }

            return await query.ToListAsync();
        }
 */