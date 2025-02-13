using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;
using mabyWorking.Data.Identity;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace mabyWorking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly UserManager<ApplicationIdentityUser> _userManager;
        private readonly IUserStore<ApplicationIdentityUser> _userStore;
        private readonly IUserEmailStore<ApplicationIdentityUser> _emailStore;
        private readonly SignInManager<ApplicationIdentityUser> _signInManager;
        private readonly ILogger<RegisterController> _logger;
        private readonly IEmailSender _emailSender;

        public RegisterController(
            UserManager<ApplicationIdentityUser> userManager,
            IUserStore<ApplicationIdentityUser> userStore,
            SignInManager<ApplicationIdentityUser> signInManager,
            ILogger<RegisterController> logger,
            IEmailSender emailSender)
        {
            _userManager = userManager;
            _userStore = userStore;
            _emailStore = GetEmailStore();
            _signInManager = signInManager;
            _logger = logger;
            _emailSender = emailSender;
        }

        public class RegisterRequest
        {
            [Required]
            public string UserName { get; set; }

            [Required]
            [EmailAddress]
            public string Email { get; set; }

            [Required]
            [MinLength(6, ErrorMessage = "Password must be at least 6 characters long.")]
            public string Password { get; set; }

            [Required]
            [Compare("Password", ErrorMessage = "Passwords do not match.")]
            public string ConfirmPassword { get; set; }
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterRequest model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new ApplicationIdentityUser();
            await _userStore.SetUserNameAsync(user, model.UserName, CancellationToken.None);
            await _emailStore.SetEmailAsync(user, model.Email, CancellationToken.None);

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                _logger.LogInformation("User created a new account with password.");

                var userId = await _userManager.GetUserIdAsync(user);
                var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

                var callbackUrl = $"{Request.Scheme}://{Request.Host}/confirm-email?userId={userId}&code={code}";

                await _emailSender.SendEmailAsync(model.Email, "Confirm your email",
                    $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

                return Ok(new { message = "User registered successfully. Please confirm your email." });
            }

            return BadRequest(result.Errors);
        }

        private IUserEmailStore<ApplicationIdentityUser> GetEmailStore()
        {
            if (!_userManager.SupportsUserEmail)
            {
                throw new NotSupportedException("Email support is required.");
            }
            return (IUserEmailStore<ApplicationIdentityUser>)_userStore;
        }
    }
}
