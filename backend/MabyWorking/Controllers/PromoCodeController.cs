using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using mabyWorking.Data;
using mabyWorking.Data.Identity;
using mabyWorking.Models;
using Microsoft.Extensions.Logging;
using mabyWorking.DTO;

namespace mabyWorking.Controllers
{
    [ApiController]
    [Route("api/promo")]
    [Authorize]
    public class PromoCodeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationIdentityUser> _userManager;
        private readonly ILogger<LoginController> _logger;

        public PromoCodeController(ApplicationDbContext context, UserManager<ApplicationIdentityUser> userManager, ILogger<LoginController> logger)
        {
            _context = context;
            _userManager = userManager;
            _logger = logger;
        }

        [HttpPost("activate")]
        public async Task<IActionResult> ActivatePromo([FromBody] PromoCodeDTO request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized(new { Message = "Пользователь не найден" });

            var promoCode = await _context.PromoCodes
                .FirstOrDefaultAsync(p => p.Name.ToLower() == request.PromoCodeName.ToLower());

            if (promoCode == null)
                return NotFound(new { Message = "Промокод не найден" });

            var userAlreadyUsed = await _context.UserPromoCodes
                .AnyAsync(up => up.UserId == userId && up.PromoCodeId == promoCode.Id);

            if (userAlreadyUsed)
                return BadRequest(new { Message = "Вы уже активировали этот промокод" });

            int currentActivations = await _context.UserPromoCodes
                .CountAsync(up => up.PromoCodeId == promoCode.Id);

            if (currentActivations >= promoCode.ActivationLimit)
                return BadRequest(new { Message = "Лимит активаций промокода исчерпан" });

            var userStats = await _context.Stats.FirstOrDefaultAsync(s => s.UserId == userId);
            if (userStats == null)
                return NotFound(new { Message = "Статистика пользователя не найдена" });

            userStats.Balance += promoCode.CoinReward;
            userStats.Xp += promoCode.ExperienceReward;

            var newStatus = await _context.Statuses
                .Where(s => s.MinXp <= userStats.Xp)
                .OrderByDescending(s => s.MinXp)
                .FirstOrDefaultAsync();

            if (newStatus != null && userStats.StatusId != newStatus.Id)
                userStats.StatusId = newStatus.Id;

            _context.UserPromoCodes.Add(new UserPromoCode
            {
                UserId = userId,
                PromoCodeId = promoCode.Id
            });

            await _context.SaveChangesAsync();

            return Ok(new { Message = $"Промокод успешно активирован! Вам начислено: {promoCode.CoinReward} монет и {promoCode.ExperienceReward} опыта" });
        }
    }
}
