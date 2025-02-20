using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace mabyWorking.Services
{
    public class EmailService:IEmailSender
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public Task SendEmailAsync(string toEmail, string subject, string body)
        {
            return Task.Run(() =>
            {
                var emailSettings = _config.GetSection("EmailSettings");

                var email = new MimeMessage();
                email.From.Add(new MailboxAddress(emailSettings["FromName"], emailSettings["FromEmail"]));
                email.To.Add(MailboxAddress.Parse(toEmail));
                email.Subject = subject;
                email.Body = new TextPart(TextFormat.Html) { Text = body };

                using var smtp = new SmtpClient();
                smtp.Connect(emailSettings["SmtpServer"], int.Parse(emailSettings["SmtpPort"]), SecureSocketOptions.StartTls);
                smtp.Authenticate(emailSettings["SmtpUsername"], emailSettings["SmtpPassword"]);
                smtp.Send(email);
                smtp.Disconnect(true);
            });
        }

       
    }
}
