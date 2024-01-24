using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using CarRent.data.Models.User;
using CarRent.Repository.Extensions;
using CarRent.Repository.Interfaces;
using CarRent.Repository.Parameters;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Service
{
    public class NotificationService : ServiceBase, INotificationService
    {
        public NotificationService(IRepositoryManager repository, IMapper mapper)
            : base(repository, mapper)
        {
        }
        // Remember to check if Notification should be send

        public async Task<List<NotificationDto>> GetNotificationsAsync()
        {

            var item = await _repository.Notification
                .FindByCondition(x => x.IsActive == true, false)
                .Select(x => new NotificationDto(
                         x.Id,
                         x.UserId,
                         x.Title,
                         x.Message,
                         x.CreatedDate,
                         x.ReadDate,
                         x.IsRead
                    )).ToListAsync();
            return item;
        }


        public async Task<int> GetNotificationsCountAsync(NotificationParameters notificationParams)
        {
            var items = await _repository.Notification
                .FindByCondition(x => x.IsActive == true && x.IsRead == false, false)
                .Search(notificationParams)
                .CountAsync();

            return items;
        }

        public async Task<PagedList<NotificationDto>> GetNotificationsByParamsAsync(NotificationParameters notificationParams)
        {
            var items = _repository.Notification
                .FindByCondition(x => x.IsActive == true, false)
                .OrderByDescending(x => x.CreatedDate)
                .Search(notificationParams)
                .Select(x => new NotificationDto(
                         x.Id,
                         x.UserId,
                         x.Title,
                         x.Message,
                         x.CreatedDate,
                         x.ReadDate,
                         x.IsRead
                    ));

            return await PagedList<NotificationDto>
                .ToPagedList(items, notificationParams.PageNumber, notificationParams.PageSize);
        }

        public async Task SendAddedRabatNotificationAsync(string UserId, NewRabatForUserDto rabat)
        {
            string Message = $"przyznano raba {rabat.RabatPercentValue} procent, rabat jest ważny do {rabat.DateOfExpiration}";
            NewNotificationDto notification = new (UserId, "New Rabat", Message);
            await CreateNotificationAsync(notification);
        }

        public async Task SendUpdateInvoiceStatusNotificationAsync(string UserId, string OldStatus, string NewStatus)
        {
            string Message = $"Zmiana statusu faktury z {OldStatus} na {NewStatus}";
            NewNotificationDto notification = new(UserId, "New Rabat", Message);
            await CreateNotificationAsync(notification);
        }
        public async Task SendUpdateRentalStatusNotificationAsync(string UserId, string OldStatus, string NewStatus)
        {
            string Message = $"Zmiana statusu z {OldStatus} na {NewStatus}";
            NewNotificationDto notification = new(UserId, "New Rabat", Message);
            await CreateNotificationAsync(notification);
        }

        public async Task<NewNotificationDto> CreateNotificationAsync(NewNotificationDto notification)
        {
            var newNotification = new Notification()
            {
                UserId = notification.UserId,
                Title = notification.Title,
                Message = notification.Message,
                CreatedDate = DateTime.Now,
                IsRead = false,
                IsActive = true,
            };

            _repository.Notification.Create(newNotification);
            await _repository.SaveAsync();

            return notification;
        }

        public async Task ReadNotificationAsync(int notificationId)
        {
            var toUpdate = await _repository.Notification
                .GetAsync(notificationId, true)
                .SingleOrDefaultAsync() ?? throw new Exception("Not found");

            toUpdate.IsRead = true;
            toUpdate.ReadDate = DateTime.Now;

            await _repository.SaveAsync();
        }

        public async Task DeleteNotificationAsync(int notificationId)
        {
            var toDelete = await _repository.Notification
                .GetAsync(notificationId, true)
                .SingleOrDefaultAsync()?? throw new Exception("Not found");

            toDelete.IsActive = false;
            await _repository.SaveAsync();
        }
    }
}
