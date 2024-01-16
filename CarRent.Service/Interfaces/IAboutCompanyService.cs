using CarRent.data.DTO;
using CarRent.data.Models.Company;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface IAboutCompanyService
    {
         Task<AboutCompanyDto> GetAboutCompany();
         Task UpdateAboutCompany(AboutCompanyDto companyDto);
    }
}
