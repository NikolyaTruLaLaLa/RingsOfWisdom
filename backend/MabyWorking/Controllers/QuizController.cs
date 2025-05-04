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
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized("Пользователь не найден");
            var userStats = await _context.Stats.Include(s => s.Status)
            .FirstOrDefaultAsync(s => s.UserId == userId);
            if (userStats == null) return NotFound("Статистика пользователя не найдена");
            if (userStats.QuizLimit <= 0)
                return BadRequest("Недостаточно попыток для прохождения квиза");
            var quiz = await _context.Quizzes.FirstOrDefaultAsync(q => q.Name == quizName);
            if (quiz == null) return NotFound("Квиз не найден");

            var rawQuestions = await _context.Questions
                .Where(q => q.QuizId == quiz.Id)
                .OrderBy(r => EF.Functions.Random())
                .Take(3)
                .ToListAsync(); 

            var questionIds = rawQuestions.Select(q => q.Id).ToList();

            var answers = await _context.Answers
                .Where(a => questionIds.Contains(a.QuestionId))
                .ToListAsync();

            var questions = rawQuestions.Select(q => new
            {
                q.Description,
                q.Explanation,
                Answers = answers
                    .Where(a => a.QuestionId == q.Id)
                    .SelectMany(a => a.Text.Split(new[] { ";" }, StringSplitOptions.RemoveEmptyEntries)
                        .Select(s => s.ToLower()))
                    .ToList()
            }).ToList();


            if (!questions.Any()) return NotFound("Вопросы для данного квиза не найдены");

            userStats.QuizPassed++;
            await _context.SaveChangesAsync();
            return Ok(questions);
        }

        [Authorize]
        [HttpPost("complete-quiz")]
        public async Task<IActionResult> CompleteQuiz([FromBody] QuizCompletionDto completionDto)
        {
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
            var quizStats = await _context.QuizStats.FirstOrDefaultAsync(s => s.StatsId == userStats.Id && s.QuizId == quiz.Id);
            if (skillStats == null) return NotFound("Статистика квиза не найдена");
            var lastQuestion = await _context.Questions
                .Where(q => q.QuizId == quiz.Id)
                .OrderByDescending(q => q.Id)
                .FirstOrDefaultAsync();

            if (lastQuestion == null) return NotFound("Вопросы в квизе не найдены");

            bool isFstTime = !quizStats.IsPassed && completionDto.CorrectAnswersCount >= 2;
            bool isPassed = completionDto.CorrectAnswersCount >= 2;
            double bonus = isFstTime ? 1.5 : 1;
            
            int totalXP = (int)(lastQuestion.RewardXp * completionDto.CorrectAnswersCount * bonus);
            int totalRings = (int)(lastQuestion.RewardRings * completionDto.CorrectAnswersCount * bonus);
            
            userStats.Xp += totalXP;
            userStats.Balance += totalRings;
            if (isFstTime)
            {
                skillStats.QuizPassed++;
                quizStats.IsPassed = true;
            }

            var newStatus = await _context.Statuses
                .Where(s => s.MinXp <= userStats.Xp)
                .OrderByDescending(s => s.MinXp)
                .FirstOrDefaultAsync();

            if (newStatus != null && userStats.StatusId != newStatus.Id)
                userStats.StatusId = newStatus.Id;
            var quizInfo = new { totalXP, totalRings, quiz.Name, isFstTime, isPassed };

            await _context.SaveChangesAsync();

            return Ok(quizInfo);
        }

        [Authorize]
        [HttpGet("can-start")]
        public async Task<IActionResult> CanStartQuiz()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userStats = await _context.Stats.FirstOrDefaultAsync(s => s.UserId == userId);
            if (userStats == null)
                return Ok(new { CanStart = false, Message = "Пользователь не найден" });

            if (userStats.QuizLimit <= userStats.QuizPassed)
                return Ok(new { CanStart = false, Message = "Недостаточно попыток для начала квиза" });


            return Ok(new { CanStart = true, Message = "Квиз можно начать" });
        }


        [Authorize]
        [HttpGet("skill/{skillName}")]
        public async Task<IActionResult> GetQuizzesBySkill(string skillName)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized("Пользователь не найден");

            var userStats = await _context.Stats
                .Include(s => s.Status)
                .FirstOrDefaultAsync(s => s.UserId == userId);
            if (userStats == null) return NotFound("Статистика пользователя не найдена");

            var skill = await _context.Skills.FirstOrDefaultAsync(
                s => s.Name.ToLower() == skillName.ToLower());
            if (skill == null) return NotFound("Скилл не найден");

            var quizzes = await _context.Quizzes
                .Where(q => q.SkillId == skill.Id)
                .ToListAsync();

            var quizAccess = await _context.QuizAccessRequirements
                .Include(r => r.RequiredStatus)
                .ToListAsync();

            var result = quizzes.Select(q =>
            {
                var requirement = quizAccess.FirstOrDefault(r => r.QuizId == q.Id);
                var canAccess = requirement == null || requirement.RequiredStatusId <= userStats.StatusId;
                var requiredStatusName = requirement?.RequiredStatus?.Name ?? null;


                return new
                {
                    q.Name,
                    IsCompleted = _context.QuizStats.Any(qs =>
                        qs.StatsId == userStats.Id &&
                        qs.QuizId == q.Id &&
                        qs.IsPassed),
                    CanAccess = canAccess,
                    RequiredStatus = requiredStatusName
                };
            }).ToList();

            return Ok(result);
        }



    }

}
