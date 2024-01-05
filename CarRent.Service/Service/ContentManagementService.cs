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

        public async Task<ContactPageDto> GetContactPage()
        {
            var item = await _repository.ContactPage
                .FindByCondition(x => x.IsActive == true, false)
                .Select(x => _mapper.Map<ContactPageDto>(x))
                .SingleOrDefaultAsync();

            return item;
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
    }
}
