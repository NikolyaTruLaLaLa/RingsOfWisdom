using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using mabyWorking.Data;
using mabyWorking.Data.Identity;
using mabyWorking.DTO;

namespace mabyWorking.Controllers
{
    [ApiController]
    [Route("api/shop")]
    [Authorize]
    public class ShopController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationIdentityUser> _userManager;
        private readonly ILogger<ShopController> _logger;

        public ShopController(ApplicationDbContext context, UserManager<ApplicationIdentityUser> userManager, ILogger<ShopController> logger)
        {
            _context = context;
            _userManager = userManager;
            _logger = logger;
        }

        [HttpGet("prices")]
        public async Task<IActionResult> GetQuizPrices()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized("Пользователь не найден");

            var stats = await _context.Stats.FirstOrDefaultAsync(s => s.UserId == userId);
            if (stats == null) return NotFound("Статистика пользователя не найдена");

            int basePrice = 150 + 10 * (stats.QuizLimit - 3);

            var prices = new
            {
                One = basePrice,
                Five = (int)(basePrice * 5 * 0.9),
                Ten = (int)(basePrice * 7.5)
            };

            return Ok(prices);
        }

        [HttpPost("buy-quiz-limit")]
        public async Task<IActionResult> BuyQuizLimit([FromBody] PurchaseDto request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized("Пользователь не найден");

            var stats = await _context.Stats.FirstOrDefaultAsync(s => s.UserId == userId);
            if (stats == null) return NotFound("Статистика пользователя не найдена");

            int basePrice = 150 + 10 * (stats.QuizLimit - 3);

            int quantity = request.Quantity;
            int totalPrice;

            switch (quantity)
            {
                case 1:
                    totalPrice = basePrice;
                    break;
                case 5:
                    totalPrice = (int)(basePrice * 5 * 0.9);
                    break;
                case 10:
                    totalPrice = (int)(basePrice * 7.5);
                    break;
                default:
                    return BadRequest("Можно приобрести только 1, 5 или 10 квизов");
            }

            if (stats.Balance < totalPrice)
                return BadRequest("Недостаточно монет для покупки");

            stats.Balance -= totalPrice;
            stats.QuizLimit += quantity;

            await _context.SaveChangesAsync();

            return Ok(new { Message = $"Покупка прошла успешно! Добавлено квизов: {quantity}" });
        }
    }

}
