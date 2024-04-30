using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Exceptions;
using CarRent.data.Models.Company;
using CarRent.Repository.Interfaces;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

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
            var toUpdate = await _repository.ApplicationSettings
                .FindByCondition(x => x.IsActive == true, true)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("ApplicationSettings not found");

            toUpdate.SendNotificationOnRentalStatusUpdate = settings.SendNotificationOnRentalStatusUpdate;
            toUpdate.SendNotificationOnInvoiceStatusUpdate = settings.SendNotificationOnInvoiceStatusUpdate;
            toUpdate.SendNotificationOnRentalCreate = settings.SendNotificationOnRentalCreate;

            await _repository.SaveAsync();
        }

        public async Task<bool> CheckSendRabatNotificationAsync() 
        {
            var value = await _repository.ApplicationSettings
               .FindByCondition(x => x.IsActive == true, false)
               .Select(x => x.SendNotificationOnRentalCreate)
               .SingleOrDefaultAsync();

            if(value == null)
            {
                return false;
            }
            return value.Value;
        }

        public async Task<bool> CheckUpdateInvoiceNotificationAsync() 
        {
            var value = await _repository.ApplicationSettings
               .FindByCondition(x => x.IsActive == true, false)
               .Select(x => x.SendNotificationOnInvoiceStatusUpdate)
               .SingleOrDefaultAsync();

            if (value == null)
            {
                return false;
            }
            return value.Value;
        }

        public async Task<bool> CheckUpdateRentalStatusNotificationAsync() 
        {
            var value = await _repository.ApplicationSettings
               .FindByCondition(x => x.IsActive == true, false)
               .Select(x => x.SendNotificationOnRentalStatusUpdate)
               .SingleOrDefaultAsync();

            if (value == null)
            {
                return false;
            }
            return value.Value;
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
