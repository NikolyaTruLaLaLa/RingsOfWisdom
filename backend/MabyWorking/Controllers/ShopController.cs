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

        [HttpPost("buy-quiz-limit")]
        public async Task<IActionResult> BuyQuizLimit([FromBody] PurchaseDto purchaseDto)
        {
            _logger.LogInformation("Attempting to purchase quiz limit increase.");

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized("Пользователь не найден");

            var userStats = await _context.Stats.FirstOrDefaultAsync(s => s.UserId == userId);
            if (userStats == null) return NotFound("Статистика пользователя не найдена");

            if (userStats.Balance < purchaseDto.Price)
                return BadRequest("Недостаточно монет для покупки");

            userStats.Balance -= purchaseDto.Price;
            userStats.QuizLimit += 1;

            await _context.SaveChangesAsync();

            return Ok(new {Message = "Лимит квизов увеличен!"});
        }
    }

    
}
