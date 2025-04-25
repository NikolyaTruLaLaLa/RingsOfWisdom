using mabyWorking.Data;
using mabyWorking.Data.Identity;
using mabyWorking.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace mabyWorking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<CourseController> _logger;

        public CourseController(ApplicationDbContext context, ILogger<CourseController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("names")]
        public async Task<IActionResult> GetCourseNames()
        {
            var courseNames = await _context.Courses
                .Select(c => c.Name)
                .ToListAsync();

            if (!courseNames.Any())
                return NotFound("Курсы не найдены");

            return Ok(courseNames);
        }

        [HttpGet("{courseName}")]
        public async Task<IActionResult> GetCourseByName(string courseName)
        {
            var course = await _context.Courses
                .FirstOrDefaultAsync(c => c.Name.ToLower() == courseName.ToLower());

            if (course == null)
                return NotFound("Курс с таким именем не найден");

            var courseDto = new CourseDTO
            {
                Name = course.Name,
                Text = course.Text,
                Link = course.Link
            };

            return Ok(courseDto);
        }
    }
}