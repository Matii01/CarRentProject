using CarRent.data.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface IUsersService
    {
        Task<User> GetWorkerByEmail(string userEmail);
        Task<IList<User>> GetWorkersListAsync();
        Task<IList<User>> GetUsersListAsync();
    }
}
