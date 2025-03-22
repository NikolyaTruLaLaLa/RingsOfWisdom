using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;
using mabyWorking.Data;

namespace mabyWorking.Services
{
    public class QuizResetService : BackgroundService
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly ILogger<QuizResetService> _logger;

        public QuizResetService(IServiceScopeFactory scopeFactory, ILogger<QuizResetService> logger)
        {
            _scopeFactory = scopeFactory;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var now = DateTime.UtcNow;
                var moscowTime = now.AddHours(3);
                //var nextResetTime = moscowTime.AddMinutes(1); //Строка для отладки. Убрать потом
                var nextResetTime = new DateTime(moscowTime.Year, moscowTime.Month, moscowTime.Day, 0, 0, 0).AddDays(1);
                var delay = nextResetTime - moscowTime;

                _logger.LogInformation($"Следующий сброс квизов через: {delay.TotalHours} часов");

                await Task.Delay(delay, stoppingToken);

                await ResetQuizCounts();
            }
        }

        private async Task ResetQuizCounts()
        {
            try
            {
                using var scope = _scopeFactory.CreateScope();
                var _context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                await _context.Stats.ExecuteUpdateAsync(s => s.SetProperty(st => st.QuizPassed, 0));

                _logger.LogInformation("✅ Квизы успешно сброшены на 0 для всех пользователей.");
            }
            catch (Exception ex)
            {
                _logger.LogError($"❌ Ошибка при сбросе квизов: {ex.Message}");
            }
        }
    }
}
