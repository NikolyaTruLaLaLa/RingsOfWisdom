using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mabyWorking.Data;
using mabyWorking.Data.Identity;
using mabyWorking.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using mabyWorking.Controllers;
using mabyWorking.DTO;

namespace mabyWorking.Controllers
{
    [ApiController]
    [Route("api/quizzes")]
    public class QuizController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationIdentityUser> _userManager;
        private readonly ILogger<LoginController> _logger;

        public QuizController(ApplicationDbContext context, UserManager<ApplicationIdentityUser> userManager, ILogger<LoginController> logger)
        {
            _context = context;
            _userManager = userManager;
            _logger = logger;
        }

        [HttpGet("{quizName}")]
        public async Task<IActionResult> GetQuizQuestions(string quizName)
        {
            _logger.LogInformation($"Get quiz qst by quiz name {quizName}");
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userStats = await _context.Stats.FirstOrDefaultAsync(s => s.UserId == userId);
            if (userStats == null) return NotFound("Статистика пользователя не найдена");

            if (userStats.QuizLimit <= 0)
                return BadRequest("Недостаточно попыток для прохождения квиза");

            var quiz = await _context.Quizzes.FirstOrDefaultAsync(q => q.Name == quizName);
            if (quiz == null) return NotFound("Квиз не найден");

            var questions = await _context.Questions
                .Where(q => q.QuizId == quiz.Id)
                .OrderBy(r => Guid.NewGuid())
                .Take(3)
                .Select(q => new
                {
                    q.Description,
                    q.Explanation,
                    Answers = _context.Answers
                        .Where(a => a.QuestionId == q.Id)
                        .Select(a => a.Text.Split(new[] { ", " }, StringSplitOptions.RemoveEmptyEntries).Select(s => s.ToLower()))
                        .SelectMany(arr => arr)
                        .ToList()
                })
                .ToListAsync();

            if (!questions.Any()) return NotFound("Вопросы для данного квиза не найдены");

            userStats.QuizLimit--;
            await _context.SaveChangesAsync();

            return Ok(questions);
        }


        [HttpPost("complete-quiz")]
        public async Task<IActionResult> CompleteQuiz([FromBody] QuizCompletionDto completionDto)
        {
            _logger.LogInformation("complite quiz reward");
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized("Пользователь не найден");

            var userStats = await _context.Stats.FirstOrDefaultAsync(s => s.UserId == userId);
            if (userStats == null) return NotFound("Статистика пользователя не найдена");

            var quiz = await _context.Quizzes.FirstOrDefaultAsync(q => q.Name == completionDto.QuizName);
            if (quiz == null) return NotFound("Квиз не найден");

            var skill = await _context.Skills.FirstOrDefaultAsync(s => s.Id == quiz.SkillId);
            if (skill == null) return NotFound("Скилл не найден");

            var skillStats = await _context.SkillStats.FirstOrDefaultAsync(s => s.StatsId == userStats.Id && s.SkillId == skill.Id);
            if (skillStats == null) return NotFound("Статистика скилла не найдена");

            var lastQuestion = await _context.Questions
                .Where(q => q.QuizId == quiz.Id)
                .OrderByDescending(q => q.Id)
                .FirstOrDefaultAsync();

            if (lastQuestion == null) return NotFound("Вопросы в квизе не найдены");

            int totalXP = lastQuestion.RewardXp * completionDto.CorrectAnswersCount;
            int totalRings = lastQuestion.RewardRings * completionDto.CorrectAnswersCount;

            userStats.Xp += totalXP;
            userStats.Balance += totalRings;
            userStats.QuizPassed += 1;

            skillStats.QuestionsPassed += completionDto.CorrectAnswersCount;

            await _context.SaveChangesAsync();

            return Ok("Награда начислена");
        }

        [HttpGet("can-start/{quizName}")]
        public async Task<IActionResult> CanStartQuiz(string quizName)
        {
            _logger.LogInformation("can start check");
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userStats = await _context.Stats.FirstOrDefaultAsync(s => s.UserId == userId);

            if (userStats == null) return NotFound("Статистика пользователя не найдена");
            if (userStats.QuizLimit <= 0) return Ok(new { CanStart = false, Message = "Недостаточно попыток" });

            return Ok(new { CanStart = true });
        }


    }

}
