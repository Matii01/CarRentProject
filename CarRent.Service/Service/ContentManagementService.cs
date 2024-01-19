using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Models.CMS;
using CarRent.Repository.Interfaces;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Service
{
    public class ContentManagementService : ServiceBase, IContentManagementService
    {
        public ContentManagementService(IRepositoryManager repository, IMapper mapper) 
            : base(repository, mapper)
        {
        }

        public async Task<HomePageDto> GetHomePage()
        {
            var item = await _repository.HomePage.FindByCondition(x => x.IsActive == true, false)
                .Select(x => _mapper.Map<HomePageDto>(x))
                .SingleOrDefaultAsync();

            if(item == null)
            {
                return await GenerateHomePage();
            }

            return item;
        }

        public async Task<ContactPageDto> GetContactPage()
        {
            var item = await _repository.ContactPage
                .FindByCondition(x => x.IsActive == true, false)
                .Select(x => _mapper.Map<ContactPageDto>(x))
                .SingleOrDefaultAsync();

            return item;
        }

        public async Task EditHomePage(HomePageDto homePage)
        {
            var item = await _repository.HomePage.FindByCondition(x => x.IsActive == true, true)
                .SingleOrDefaultAsync() ?? throw new Exception("not found");

            item.HomePageImage = homePage.HomePageImage;
            item.HomePageTitle = homePage.HomePageTitle;
            item.HomePageTextOne = homePage.HomePageTextOne;
            item.HomePageTextTwo = homePage.HomePageTextTwo;

            await _repository.SaveAsync();
        }

        public async Task EditContactPage(ContactPageDto pageDto)
        {
            var item = await _repository.ContactPage
                .FindByCondition(x => x.IsActive == true, true)
                .SingleOrDefaultAsync();

            item.PageTitle = pageDto.PageTitle;
            item.PageDescription = pageDto.PageDescription;
            item.AddressTitle= pageDto.AddressTitle;
            item.AddressIcon= pageDto.AddressIcon;
            item.AddressDetails= pageDto.AddressDetails;
            item.PhoneTitle= pageDto.PhoneTitle;
            item.PhoneIcon= pageDto.PhoneIcon;
            item.PhoneDetails= pageDto.PhoneDetails;
            item.PhoneNumber=   pageDto.PhoneNumber;
            item.EmailTitle= pageDto.EmailTitle;
            item.EmailIcon= pageDto.EmailIcon;
            item.EmailAddress= pageDto.EmailAddress;
            item.ContactSectionTitle= pageDto.ContactSectionTitle;
            item.TextRowOne = pageDto.TextRowOne;
            item.TextRowTwo = pageDto.TextRowTwo;

            await _repository.SaveAsync();
        }

        public async Task<FooterDto> GetFooter()
        {
            var item = await _repository.Footer
                .FindByCondition(x => x.IsActive, true)
                .Include(x => x.Links)
                .ThenInclude(y => y.Paths)
                .Select(x => new FooterDto(
                    x.Title,
                    x.Description,
                    x.NewsLetterTitle,
                    x.NewsLetterDescription,
                    x.NewsLetterInfo,
                    x.FacebookLink,
                    x.YouTubeLink,
                    x.InstagramLink,
                    x.TikTokLink,
                    x.Info,
                    x.Links.Select(l => new FooterLinksDto(
                        x.Id, 
                        l.Title, 
                        l.Paths.Select(p => new FooterLinksPathsDto(
                            l.Id,
                            p.Name,
                            p.Path,
                            p.DisplayPosition
                            ))))
                    ))
                .SingleOrDefaultAsync();

            return item;
        }
        private async Task<HomePageDto> GenerateHomePage()
        {
            HomePage home = new() { IsActive = true };
            _repository.HomePage.Create(home);
            await _repository.SaveAsync();
            return _mapper.Map<HomePageDto>(home);
        }
    }
}
