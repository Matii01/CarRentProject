using CarRent.data.DTO;
using CarRent.Repository.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface INewsletterService
    {
        Task<PagedList<SendHistoryForWorkerViewDto>> GetSendHistoryByParamsAsync(SendHistoryParameters parameters);
        Task<PagedList<NewsletterSubscriberDto>> GetNewsletterSubscribersByParamsAsync(SubscriberParam param);
        Task NewSubscription(string newSubscription);
        Task SendNewMessage(SendHistoryDto newSubscription);
    }
}
