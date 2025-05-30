﻿using mabyWorking.Data;
using mabyWorking.Data.Identity;
using mabyWorking.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using mabyWorking.Controllers;
using mabyWorking.DTO;

[Route("api/profile")]
[ApiController]
[Authorize]
public class ProfileController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationIdentityUser> _userManager;
    private readonly ILogger<ProfileController> _logger;

    public ProfileController(ApplicationDbContext context, UserManager<ApplicationIdentityUser> userManager, ILogger<ProfileController> logger)
    {
        _context = context;
        _userManager = userManager;
        _logger = logger;
    }

    [HttpGet("info")]
    public async Task<IActionResult> GetUserInfo()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return NotFound("Пользователь не найден");

        var stats = await _context.Stats.Include(s => s.Status)
            .FirstOrDefaultAsync(s => s.UserId == userId);

        if (stats == null) return NotFound("Статистика не найдена");

        var skills = await _context.Skills.ToListAsync();
        var skillProgress = await _context.SkillStats
            .Where(ss => ss.StatsId == stats.Id)
            .ToListAsync();

        var progress = skills.ToDictionary(
            skill => skill.Name,
            skill =>
            {
                var totalQuizzes = _context.Quizzes.Count(q => q.SkillId == skill.Id);
                return totalQuizzes == 0 ? 0 : skillProgress
                     .Where(sp => sp.SkillId == skill.Id)
                     .Select(sp => (sp.QuizPassed * 100) / totalQuizzes)
                     .FirstOrDefault();
            }
        );


        return Ok(new
        {
            Username = user.UserName,
            Email = user.Email,
            Balance = stats.Balance,
            XP = stats.Xp,
            Status = stats.Status?.Name ?? "Без статуса",
            Progress = progress
        });
    }

    [HttpPut("change-username")]
    public async Task<IActionResult> ChangeUsername([FromBody] ChangeUsernameDto request)
    {
        if (string.IsNullOrWhiteSpace(request.NewUserName))
            return BadRequest(new { Message = "Никнейм не может быть пустым" });

        var existingUser = await _userManager.FindByNameAsync(request.NewUserName);
        if (existingUser != null)
            return BadRequest(new { Message = "Никнейм уже используется" });

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
            return NotFound(new { Message = "Пользователь не найден" });

        user.UserName = request.NewUserName;
        user.NormalizedUserName = request.NewUserName.ToUpper();

        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
            return BadRequest(new { Message = "Ошибка при изменении никнейма" });

        return Ok(new { Message = "Никнейм успешно изменён" });
    }


    [HttpGet("top5")]
    public async Task<IActionResult> GetTopPlayers()
    {
        var topPlayers = await _context.Stats
            .OrderByDescending(s => s.Xp)
            .Take(5)
            .Include(s => s.Status)
            .ToListAsync();
        return Ok(topPlayers.Select(s => new
        {
            username = _userManager.Users.FirstOrDefault(u => u.Id == s.UserId)?.UserName,
            xp = s.Xp,
            status = s.Status?.Name ?? "Без статуса"
        }));
    }

    [HttpGet("rank")]
    public async Task<IActionResult> GetUserRank()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var stats = await _context.Stats.FirstOrDefaultAsync(s => s.UserId == userId);
        if (stats == null) return NotFound("Статистика не найдена");

        var urank = await _context.Stats.CountAsync(s => s.Xp > stats.Xp) + 1;

        return Ok(new { rank = urank });
    }

    [HttpGet("email")]
    public async Task<IActionResult> GetUserEmail()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return NotFound("Пользователь не найден");

        return Ok(new { Email = user.Email });
    }

    [HttpGet("balance")]
    public async Task<IActionResult> GetBalance()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var stats = await _context.Stats.FirstOrDefaultAsync(s => s.UserId == userId);

        if (stats == null) return NotFound("Статистика не найдена");

        return Ok(new { balance = stats.Balance });
    }

    [HttpGet("quiz-stats")]
    public async Task<IActionResult> GetQuizStats()
    {
        
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return Unauthorized();

        var stats = await _context.Stats.FirstOrDefaultAsync(s => s.UserId == userId);
        if (stats == null) return NotFound("Статистика не найдена");
        
        var quizLimit = stats.QuizLimit;
        var quizPassed = quizLimit - stats.QuizPassed;

        return Ok(new { quizPassed, quizLimit });
    }

    [HttpGet("statuses")]
    public async Task<IActionResult> GetStatusesAndNextStatus()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return Unauthorized("Пользователь не найден");

        var stats = await _context.Stats
            .FirstOrDefaultAsync(s => s.UserId == userId);

        if (stats == null) return NotFound("Статистика пользователя не найдена");

        var allStatuses = await _context.Statuses
            .OrderBy(s => s.MinXp)
            .Select(s => new
            {
                s.Name,
                MinXp = s.MinXp
            })
            .ToListAsync();

        var nextStatus = allStatuses
            .FirstOrDefault(s => s.MinXp > stats.Xp);

        var xpToNext = nextStatus != null ? nextStatus.MinXp - stats.Xp : 0;

        return Ok(new
        {
            AllStatuses = allStatuses,
            NextStatus = nextStatus != null
                ? new
                {
                    nextStatus.Name,
                    XPNeeded = xpToNext
                }
                : null
        });
    }

}
