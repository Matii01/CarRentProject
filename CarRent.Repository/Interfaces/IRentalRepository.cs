using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Interfaces
{
    public interface IRentalRepository
    {
        IQueryable<Rental> GetAllAsync(bool trackChanges, string sortByProperty);
        IQueryable<Rental> GetAllActiveAsync(bool trackChanges);
        IQueryable<Rental> GetRentalForCar(int carId);
        Task<IEnumerable<UserRentalListDto>> GetUserRentalsAsync(string userId);
        Task<UserRentalDetailDto> GetUserRentalDetailAsync(string userId, int rentalId);
        Task<PagedList<RentalListDataDto>> GetPagedListRentalActiveAsync(RentalParameters param, bool trackChanges);
        Task<PagedList<InvoiceDto>> GetInvoicesDataAsync(OrderParameters param, bool trackChanges);
        IQueryable<Rental> FindByCondition(Expression<Func<Rental, bool>> expression, bool trackChanges);
        IQueryable<Rental> GetAsync(int id, bool trackChanges);
        void Create(Rental carMake);
        void Delete(Rental carMake);
        Task<InvoiceDto> GetRentalInfoByPaymentId(string paymentId);
    }
}
