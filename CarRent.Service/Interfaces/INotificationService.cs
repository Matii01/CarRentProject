﻿using CarRent.data.DTO;
using CarRent.data.Models.User;
using CarRent.Repository.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface INotificationService
    {
        Task<List<NotificationDto>> GetNotificationsAsync();
        Task<PagedList<NotificationDto>> GetNotificationsByParamsAsync(NotificationParameters notificationParams);
        Task<int> GetNotificationsCountAsync(NotificationParameters notificationParams);
        Task<NewNotificationDto> CreateNotificationAsync(NewNotificationDto notification);
        Task SendAddedRabatNotificationAsync(string UserId, NewRabatForUserDto rabat);
        Task ReadNotificationAsync(int notificationId);
        Task DeleteNotificationAsync(int notificationId);
        Task SendUpdateInvoiceStatusNotificationAsync(string UserId, string OldStatus, string NewStatus);
        Task SendUpdateRentalStatusNotificationAsync(string UserId, string OldStatus, string NewStatus);
        Task SendAddedRentalNotificationAsync(string UserId, NewRentalForClient rental);
    }
}
