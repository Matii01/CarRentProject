using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using MailKit.Net.Smtp;
using MimeKit;


namespace CarRent.SendingEmail
{
    public class EmailSender : IEmailSender
    {
        private readonly EmailConfiguration _emailConfig;

        public EmailSender(EmailConfiguration emailConfiguration)
        {
            _emailConfig = emailConfiguration;
        }

        public void SendEmail(Message message)
        {
            var emailMessage = CreateEmailMessage(message);

            Send(emailMessage);
        }

        public void SendEmailPaymentSucceeded(ClientDetailsDto client, NewRentalForClient rental, List<InvoiceItemDto> InvoiceItems)
        {
            string emailContent = $"Yor rental was added :) \nRental from: {rental.DateFrom}, to {rental.DateTo}";
            var message = new Message(new string[] { $"{client.Email}" }, "New Rental", emailContent);
            SendEmail(message);
        }

        public void SendEmailPaymentFailed(ClientDetailsDto client)
        {
            var message = new Message(new string[] { $"{client.Email}" }, "New Rental failed", "Something was wrong");
            SendEmail(message);
        }

        private MimeMessage CreateEmailMessage(Message message)
        {
            var emailMessage = new MimeMessage();
            //emailMessage.From.Add(new MailboxAddress(_emailConfig.From));
            emailMessage.From.Add(new MailboxAddress("email", _emailConfig.From));
            emailMessage.To.AddRange(message.To);
            emailMessage.Subject = message.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text) { Text = message.Content };
            return emailMessage;
        }

        private void Send(MimeMessage mailMessage)
        {
            using(var client = new SmtpClient())
            {
                try
                {
                    client.Connect(_emailConfig.SmtpServer, _emailConfig.Port, true);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    client.Authenticate(_emailConfig.UserName, _emailConfig.Password);
                    client.Send(mailMessage);
                }
                catch
                {
                    //log an error message or throw an exception or both.
                    throw;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }
    }
}
