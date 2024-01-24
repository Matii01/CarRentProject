using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Models.Company;
using CarRent.Repository.Extensions;
using CarRent.Repository.Interfaces;
using CarRent.Repository.Parameters;
using CarRent.SendingEmail;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Service
{
    public class NewsletterService : ServiceBase, INewsletterService
    {
        private readonly IEmailSender _emailSender;

        public NewsletterService(IRepositoryManager repository, IMapper mapper, IEmailSender emailSender)
            : base(repository, mapper)
        {
            _emailSender = emailSender;
        }

        public async Task<PagedList<SendHistoryForWorkerViewDto>> GetSendHistoryByParamsAsync(SendHistoryParameters parameters)
        {
            var list =  _repository.SendHistory
                .FindByCondition(x => x.IsActive == true, false)
                .OrderByDescending(x => x.CreatedDate)
                .Search(parameters)
                .Select(x => new SendHistoryForWorkerViewDto
                    (
                        x.Id,
                        x.CreatedDate,
                        x.Title,
                        x.Message
                    ));

            return await PagedList<SendHistoryForWorkerViewDto>
                .ToPagedList(list, parameters.PageNumber, parameters.PageSize);
        }

        public async Task<PagedList<NewsletterSubscriberDto>> GetNewsletterSubscribersByParamsAsync(SubscriberParam param)
        {
            var list = _repository.NewsletterSubscriber
                .FindByCondition(x => x.IsActive == true, false)
                .OrderByDescending(x => x.SubscribeDate)
                .Search(param)
                .Select(x => new NewsletterSubscriberDto
                    (
                       x.Id,
                        x.Email,
                        x.SubscribeDate,
                        x.UnsubscribeDate,
                        x.IsSubscribe
                    ));

            return await PagedList<NewsletterSubscriberDto>
                .ToPagedList(list, param.PageNumber, param.PageSize);
        }

        public async Task NewSubscription(string newSubscription)
        {
            if (newSubscription.IsNullOrEmpty()){
                return;
            }

            var list = await _repository.NewsletterSubscriber
                .FindByCondition(x => x.Email == newSubscription, true)
                .ToListAsync();

            if (list.Count > 0)
            {
                return;
            }


            var sub = new NewsletterSubscriber()
            {
                Email = newSubscription,
                IsSubscribe = true,
                IsActive = true,
                SubscribeDate = DateTime.Now,
                UnsubscribeDate = null,
            };
            _repository.NewsletterSubscriber.Create(sub);
            await _repository.SaveAsync();
        }

        public async Task SendNewMessage(SendHistoryDto newMessage)
        {
            var message = new SendHistory
            {
                Title = newMessage.Title,
                Message = newMessage.Message,
                CreatedDate = DateTime.Now,
                IsActive = true,
            };
            _repository.SendHistory.Create(message);
            await _repository.SaveAsync();

            var items = await GetEmails();
            if(items != null && items.Length > 0)
            {
                _emailSender.SendEmailToNewsletterSubscribers(newMessage, items);
            }
        }

        private async Task<string[]> GetEmails()
        {
            var items = await _repository.NewsletterSubscriber
                .FindByCondition(
                    x => x.IsActive == true && 
                    x.IsSubscribe == true, false
                 )
                .Select(x => x.Email)
                .ToArrayAsync();

            return items;
        }
    }
}
