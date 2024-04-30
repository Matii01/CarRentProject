using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Exceptions;
using CarRent.data.Models.User;
using CarRent.Repository.Extensions;
using CarRent.Repository.Interfaces;
using CarRent.Repository.Parameters;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CarRent.Service.Service
{
    public class NotificationService : ServiceBase, INotificationService
    {
        private IApplicationSettingsService _settingsService;
        public NotificationService(IRepositoryManager repository, IMapper mapper, IApplicationSettingsService settingsService)
            : base(repository, mapper)
        {
            _settingsService = settingsService;
        }

        public async Task<List<NotificationDto>> GetNotificationsAsync()
        {

            var item = await _repository.Notification
                .FindByCondition(x => x.IsActive == true, false)
                .OrderByDescending(x => x.CreatedDate)
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
            if (await _settingsService.CheckSendRabatNotificationAsync())
            {
                string Message = $"A discount of {rabat.RabatPercentValue}% has been granted, the discount is valid until {rabat.DateOfExpiration}";
                NewNotificationDto notification = new(UserId, "New Rabat", Message);
                await CreateNotificationAsync(notification);
            }
        }

        public async Task SendUpdateInvoiceStatusNotificationAsync(string UserId, string OldStatus, string NewStatus)
        {
            if (await _settingsService.CheckUpdateInvoiceNotificationAsync())
            {
                string Message = $"Invoice status change from {OldStatus} to {NewStatus}";
                NewNotificationDto notification = new(UserId, "Invoice Status Update", Message);
                await CreateNotificationAsync(notification);
            }
        }
        public async Task SendUpdateRentalStatusNotificationAsync(string UserId, string OldStatus, string NewStatus)
        {
            var item = await _repository.ApplicationSettings
                .FindByCondition(x => x.IsActive == true, false)
                .SingleOrDefaultAsync();

            if (await _settingsService.CheckUpdateRentalStatusNotificationAsync())
            {
                string Message = $"Change the status from {OldStatus} to {NewStatus}";
                NewNotificationDto notification = new(UserId, "Rental Status Update", Message);
                await CreateNotificationAsync(notification);
            }
        }

        public async Task SendAddedRentalNotificationAsync(string UserId, NewRentalForClient rental)
        {
            if (await _settingsService.CheckUpdateRentalStatusNotificationAsync())
            {
                string Message = $"A new rental has been added. \nFrom: {rental.DateFrom} \nTo {rental.DateTo}";
                NewNotificationDto notification = new(UserId, "Create Rental", Message);
                await CreateNotificationAsync(notification);
            }
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
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("Not found");

            toUpdate.IsRead = true;
            toUpdate.ReadDate = DateTime.Now;

            await _repository.SaveAsync();
        }

        public async Task DeleteNotificationAsync(int notificationId)
        {
            var toDelete = await _repository.Notification
                .GetAsync(notificationId, true)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("Not found");

            toDelete.IsActive = false;
            await _repository.SaveAsync();
        }
    }
}
