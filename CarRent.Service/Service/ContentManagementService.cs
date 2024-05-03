using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Exceptions;
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
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("Page not found");

            return item;
        }

        public async Task EditHomePage(HomePageDto homePage)
        {
            var item = await _repository.HomePage.FindByCondition(x => x.IsActive == true, true)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("Page not found");

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
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("Page not found"); 

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
                        l.Id,
                        x.Id, 
                        l.Title, 
                        l.Paths.Where(x => x.IsActive == true)
                            .Select(p => new FooterLinksPathsDto(
                            p.Id,
                            l.Id,
                            p.Name,
                            p.Path,
                            p.DisplayPosition
                            ))))
                    ))
                .SingleOrDefaultAsync();

            if(item == null)
            {
                return await GenerateFooter();
            }

            return item;
        }

        public async Task EditFooter(FooterDto footer)
        {
            var item = await _repository.Footer
                 .FindByCondition(x => x.IsActive, true)
                 .SingleOrDefaultAsync() ?? throw new DataNotFoundException("Page not found");
 
            item.Title = footer.Title;
            item.Description = footer.Description;
            item.InstagramLink = footer.InstagramLink;
            item.FacebookLink = footer.FacebookLink;
            item.YouTubeLink = footer.YouTubeLink;
            item.TikTokLink = footer.TikTokLink;
            item.NewsLetterTitle = footer.NewsLetterTitle;
            item.NewsLetterDescription = footer.NewsLetterDescription;
            item.NewsLetterInfo = footer.NewsLetterInfo;
            item.Info = footer.Info;

            await _repository.SaveAsync();
        }

        public async Task EditFooterLinks(int id, FooterLinksDto links)
        {
            var toUpdate = await _repository.FooterLinks
                .GetAsync(id, true)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("Page not found");

            toUpdate.Title = links.Title;
            await _repository.SaveAsync();
            await EditFooterPathLinks(id, links.Paths);
        }

        private async Task EditFooterPathLinks(int FooterLinksId, IEnumerable<FooterLinksPathsDto> paths)
        {
            foreach (var path in paths)
            {
                if(path.Id == 0)
                {
                   await AddNewFooterPathLinks(FooterLinksId, path);
                }
            }

            var toUpdate = await _repository.FooterLinksPaths
                .FindByCondition(x => x.IsActive == true, true)
                .ToListAsync();

            foreach (var it in toUpdate)
            {
                var newData = paths.Where(x=> x.Id == it.Id).SingleOrDefault();
                if(newData != null)
                {
                    it.Path = newData.Path;
                    it.Name = newData.Name;
                } 
            }
            await _repository.SaveAsync();
        }

        private async Task AddNewFooterPathLinks(int FooterLinksId, FooterLinksPathsDto paths)
        {
            FooterLinksPaths footerLinksPaths = new ()
            {
                FooterLinksId = FooterLinksId,
                IsActive = true,
                Path = paths.Path,
                Name = paths.Name,
            };

            _repository.FooterLinksPaths.Create(footerLinksPaths);
            await _repository.SaveAsync();
        }

        public async Task DeleteFooterLinkPath(int id)
        {
            var item = await _repository.FooterLinksPaths
                .GetAsync(id, true)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("Not found");

            item.IsActive = false;
            await _repository.SaveAsync();
        }

        private async Task<FooterDto> GenerateFooter()
        {
            // TODO 
            await Task.Delay(100);
            throw new NotImplementedException();
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
