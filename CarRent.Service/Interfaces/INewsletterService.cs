using CarRent.data.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface INewsletterService
    {
        Task NewSubscription(string newSubscription);
        Task SendNewMessage(SendHistoryDto newSubscription);
    }
}
