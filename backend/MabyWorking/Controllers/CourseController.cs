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
            var courseList = await _context.Courses
                .Select(c => new { c.Id, c.Name })
                .ToListAsync();

            if (!courseList.Any())
                return NotFound("Курсы не найдены");

            return Ok(courseList);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCourseById(int id)
        {
            var course = await _context.Courses
                .FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
                return NotFound("Курс с таким ID не найден");

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