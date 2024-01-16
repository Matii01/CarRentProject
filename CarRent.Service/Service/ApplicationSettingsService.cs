using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Models.Company;
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
    public class ApplicationSettingsService : ServiceBase, IApplicationSettingsService
    {
        public ApplicationSettingsService(IRepositoryManager repository, IMapper mapper) 
            : base(repository, mapper)
        {
        }

        public async Task<ApplicationSettingsDto> GetApplicationSettings()
        {
            var about = await _repository.ApplicationSettings
                .FindByCondition(x => x.IsActive == true, false)
                .Select(x=> new ApplicationSettingsDto(
                    x.SendNotificationOnRentalStatusUpdate,
                    x.SendNotificationOnInvoiceStatusUpdate,
                    x.SendNotificationOnRentalCreate
                ))
                .SingleOrDefaultAsync();

            if(about == null)
            {
               return await CreateApplicationSettings();
            }

            return about;
        }

        public async Task UpdateApplicationSettings(ApplicationSettingsDto settings)
        {
            var toUpdate = await _repository.AboutCompany
                .FindByCondition(x => x.IsActive == true, false)
                .SingleOrDefaultAsync();
            
            await _repository.SaveAsync();
        }

        private async Task<ApplicationSettingsDto> CreateApplicationSettings()
        {
            _repository.ApplicationSettings.Create(new ApplicationSettings()
            {
                SendNotificationOnRentalStatusUpdate = true,
                SendNotificationOnInvoiceStatusUpdate = true,
                SendNotificationOnRentalCreate = true,
                
                IsActive = true,
            });
            await _repository.SaveAsync();

            return new ApplicationSettingsDto(true, true, true);
        }
    }
}
