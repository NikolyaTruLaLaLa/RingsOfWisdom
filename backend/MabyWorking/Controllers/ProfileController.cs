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
        _logger.LogInformation("info check");
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
            skill => skillProgress
                .Where(sp => sp.SkillId == skill.Id)
                .Select(sp => (sp.QuestionsPassed * 100) / _context.Questions.Count(q => q.Quiz.SkillId == skill.Id))
                .FirstOrDefault()
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
    public async Task<IActionResult> ChangeUsername([FromBody] string newUsername)
    {
        if (string.IsNullOrWhiteSpace(newUsername)) return BadRequest("Никнейм не может быть пустым");

        var existingUser = await _userManager.FindByNameAsync(newUsername);
        if (existingUser != null) return BadRequest("Никнейм уже используется");

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return NotFound("Пользователь не найден");

        user.UserName = newUsername;
        user.NormalizedUserName = newUsername.ToUpper();

        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded) return BadRequest("Ошибка при изменении никнейма");

        return Ok("Никнейм успешно изменён");
    }

    [HttpGet("top5")]
    public async Task<IActionResult> GetTopPlayers()
    {
        _logger.LogInformation("get top5");
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

        _logger.LogInformation($"Get user rank {urank}");
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
}
