using mabyWorking.Data;
using mabyWorking.Data.Identity;
using mabyWorking.DTO;
using mabyWorking.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace mabyWorking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ProfileController> _logger;

        public CourseController(ApplicationDbContext context, UserManager<ApplicationIdentityUser> userManager, ILogger<ProfileController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("getCourses")]
        public async Task<IActionResult>GetCourses()
        {
            List<CourseDTO> courses = await _context.Courses.Select(c => new CourseDTO() { Link = c.Link, Name = c.Name, Text = c.Text }).ToListAsync();
            return Ok(courses);
        }


    }
}
