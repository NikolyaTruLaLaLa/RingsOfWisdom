using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity.UI.Services;
using Humanizer;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using mabyWorking.Interfaces;
using mabyWorking.Configurations;
using Microsoft.Extensions.Options;


namespace mabyWorking.Services
{
    public class EmailService : Interfaces.IEmailSender
    {
        private readonly EmailSettings _config;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IOptions<EmailSettings> emailSettings, ILogger<EmailService> logger)
        {
            _config = emailSettings.Value;
            _logger = logger;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("Rings of Wisdom", _config.SenderEmail));
            emailMessage.To.Add(new MailboxAddress("", toEmail));
            emailMessage.Subject = subject;

            var bodyBuilder = new BodyBuilder { HtmlBody = body };
            emailMessage.Body = bodyBuilder.ToMessageBody();

            using var client = new SmtpClient();
            try
            {
                await client.ConnectAsync(_config.SmtpServer,
                                          _config.SmtpPort,
                                          SecureSocketOptions.SslOnConnect);
                await client.AuthenticateAsync(_config.SenderEmail,
                                               _config.Password);
                await client.SendAsync(emailMessage);
                await client.DisconnectAsync(true);
                _logger.LogInformation("Email sent to {Recipient}", toEmail);
            }
            catch (Exception ex)
            {
                _logger.LogError("Email sending failed: {Error}", ex.Message);
                throw;
            }
        }

       
    }
}
