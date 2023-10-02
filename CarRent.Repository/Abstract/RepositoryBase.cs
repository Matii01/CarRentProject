using CarRent.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Abstract
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected CarRentContext context;

        protected RepositoryBase(CarRentContext context)
        {
            this.context = context;
        }

        public IQueryable<T> All(bool trackChanges)
        {
            return !trackChanges ? 
                context.Set<T>().AsNoTracking() :
                context.Set<T>();
        }

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression, bool trackChanges)
        {
            return !trackChanges ? 
                context.Set<T>().Where(expression).AsNoTracking() :
                context.Set<T>().Where(expression);
        }

        public void Create(T entity)
        {
            context.Set<T>().Add(entity);
        }

        public void Update(T entity)
        {
            context.Set<T>().Update(entity);
        }
        public void Delete(T entity)
        {
            context.Set<T>().Remove(entity);
        }
    }
}
