using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Exceptions;
using CarRent.data.Models.Company;
using CarRent.Repository.Interfaces;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CarRent.Service.Service
{
    public class AboutCompanyService : ServiceBase, IAboutCompanyService
    {
        public AboutCompanyService(IRepositoryManager repository, IMapper mapper) 
            : base(repository, mapper)
        {
        }

        public async Task<AboutCompanyDto> GetAboutCompany()
        {
            var about = await _repository.AboutCompany
                .FindByCondition(x => x.IsActive == true, false)
                .Select(x => new AboutCompanyDto(
                        x.NIP,
                        x.REGON,
                        x.Name,
                        x.Owner,
                        x.Address,
                        x.PhoneNumber,
                        x.Email,
                        x.State,
                        x.City,
                        x.Image
                    ))
                .SingleOrDefaultAsync();

            if (about == null)
            {
                return await CreateAboutCompany();
            }

            return about;
        }

        public async Task UpdateAboutCompany(AboutCompanyDto companyDto)
        {
            var toUpdate = await _repository.AboutCompany
                .FindByCondition(x => x.IsActive == true, true)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("About company not found");

            toUpdate.NIP = companyDto.NIP;
            toUpdate.REGON = companyDto.REGON;
            toUpdate.Name = companyDto.Name;
            toUpdate.Owner = companyDto.Owner;
            toUpdate.Address = companyDto.Address;
            toUpdate.PhoneNumber = companyDto.PhoneNumber;
            toUpdate.Email = companyDto.Email;
            toUpdate.State = companyDto.State;
            toUpdate.City = companyDto.City;
            toUpdate.Image = companyDto.Image;

            await _repository.SaveAsync();
        }

        private async Task<AboutCompanyDto> CreateAboutCompany()
        {
            _repository.AboutCompany.Create(new AboutCompany()
            {
                NIP = " ",
                REGON = " ",
                Name = " ",
                IsActive = true,
            });
            await _repository.SaveAsync();
            return new AboutCompanyDto("", "", "", "", "", "", "", "", "", "");
        }
    }
}
