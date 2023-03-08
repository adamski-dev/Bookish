using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<T> GetByIdAsync(int id);
        Task<IReadOnlyList<T>> ListAllAsync();
        Task<T> GetEntityWithSpec(ISpecification<T> spec);
        Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec);

        // Property for pagination result
        Task<int> CountAsync(ISpecification<T> spec);

        // Methods to support db updates added with IUnitOfWork
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);

    }
}