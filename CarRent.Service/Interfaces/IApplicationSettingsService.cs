using CarRent.data.DTO;
using CarRent.Service.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface IApplicationSettingsService
    {
        Task<ApplicationSettingsDto> GetApplicationSettings();
        Task UpdateApplicationSettings(ApplicationSettingsDto settings);
        Task<bool> CheckSendRabatNotificationAsync();
        Task<bool> CheckUpdateInvoiceNotificationAsync();
        Task<bool> CheckUpdateRentalStatusNotificationAsync();
    }
}
