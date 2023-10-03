namespace CarRent.Service.Interfaces
{
    public interface IGenericService<T>
    {
        Task<IEnumerable<T>> GetAllAsync(bool trackChanges);
        Task<IEnumerable<T>> GetAllActiveAsync(bool trackChanges);
        Task<T> GetAsync(int id, bool trackChanges);
        Task<T> CreateAsync(T carMake);
        Task UpdateAsync(int id, T carMake, bool trackChanges);
    }
}
