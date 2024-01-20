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
        Task<HomePageDto> GetHomePage();
        Task EditHomePage(HomePageDto homePage);
        Task<ContactPageDto> GetContactPage();
        Task EditContactPage(ContactPageDto pageDto);
        Task<FooterDto> GetFooter();
        Task EditFooter(FooterDto footer);
        Task EditFooterLinks(int id, FooterLinksDto links);
        Task DeleteFooterLinkPath(int id);
    }
}
