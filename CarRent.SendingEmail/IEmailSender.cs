using CarRent.data.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.SendingEmail
{
    public interface IEmailSender
    {
        void SendEmail(Message message);
        void SendAnswerMessage(string email, string title, string message);
        void SendEmailPaymentSucceeded(ClientDetailsDto client, NewRentalForClient rental, List<InvoiceItemDto> InvoiceItems);
        void SendEmailPaymentFailed(ClientDetailsDto client);
        void SendEmailToNewsletterSubscribers(SendHistoryDto message, string[] emails);
    }
}
