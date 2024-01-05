using CarRent.data.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface IContentManagementService
    {
        Task<ContactPageDto> GetContactPage();
        Task EditContactPage(ContactPageDto pageDto);
    }
}
