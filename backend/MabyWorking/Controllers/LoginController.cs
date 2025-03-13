using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using mabyWorking.Data.Identity;

namespace mabyWorking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly SignInManager<ApplicationIdentityUser> _signInManager;
        private readonly ILogger<LoginController> _logger;

        public LoginController(SignInManager<ApplicationIdentityUser> signInManager, ILogger<LoginController> logger)
        {
            _signInManager = signInManager;
            _logger = logger;
        }

        public class LoginRequest
        {
            [Required]
            public string UserName { get; set; }

            [Required]
            public string Password { get; set; }

            public bool RememberMe { get; set; }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _signInManager.PasswordSignInAsync(model.UserName, model.Password, model.RememberMe, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                _logger.LogInformation("User logged in.");
                return Ok(new { message = "Login successful" });
            }
            if (result.RequiresTwoFactor)
            {
                return BadRequest(new { message = "Two-factor authentication required." });
            }
            if (result.IsLockedOut)
            {
                _logger.LogWarning("User account locked out.");
                return BadRequest(new { message = "User account is locked out." });
            }

            return Unauthorized(new { message = "Invalid login attempt." });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            _logger.LogInformation("User logged out.");
            return Ok(new { message = "Logout successful" });
        }
    }
}
