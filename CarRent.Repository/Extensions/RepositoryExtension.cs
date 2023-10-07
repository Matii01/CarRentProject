using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Extensions
{
    internal static class RepositoryExtension
    {
        /// <summary>
        /// Dynamically sorts an IQueryable based on a property name and sort direction.
        /// </summary>
        /// <typeparam name="T">Type of the elements in the source sequence.</typeparam>
        /// <param name="q">The source IQueryable.</param>
        /// <param name="sortField">The name of the property by which to sort the sequence.</param>
        /// <param name="ascending">Determines if the sequence should be sorted in ascending (true) or descending (false) order.</param>
        /// <returns>An IQueryable<T> whose elements are sorted by the specified property.</returns>
        public static IQueryable<T> OrderByField<T>(this IQueryable<T> q, string sortField, bool ascending)
        {
            // Represents the parameter of the lambda expression (the entity to be sorted).
            var param = Expression.Parameter(typeof(T), "p");

            // Represents the property of the entity to be sorted.
            var prop = Expression.Property(param, sortField);

            // Constructs a lambda expression which represents the sorting key.
            var exp = Expression.Lambda(prop, param);

            // Determines the appropriate sorting method (OrderBy or OrderByDescending).
            string method = ascending ? "OrderBy" : "OrderByDescending";

            // Defines the types for the sorting method.
            Type[] types = new Type[] { q.ElementType, exp.Body.Type };

            // Constructs a method call expression for the sorting method on the IQueryable source.
            var mce = Expression.Call(typeof(Queryable), method, types, q.Expression, exp);

            // Executes the constructed expression against the source IQueryable.
            return q.Provider.CreateQuery<T>(mce);
        }
    }
}

