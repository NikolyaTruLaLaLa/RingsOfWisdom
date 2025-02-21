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
using mabyWorking.Services;
using mabyWorking.Interfaces;
using mabyWorking.Configurations;
using Microsoft.Extensions.Options;

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
        private readonly Interfaces.IEmailSender _emailSender;
        private readonly AppSetittings _config;

        public RegisterController(
            UserManager<ApplicationIdentityUser> userManager,
            IUserStore<ApplicationIdentityUser> userStore,
            SignInManager<ApplicationIdentityUser> signInManager,
            ILogger<RegisterController> logger,
            Interfaces.IEmailSender emailSender, IOptions<AppSetittings> appSettings)
        {
            _userManager = userManager;
            _userStore = userStore;
            _emailStore = GetEmailStore();
            _signInManager = signInManager;
            _logger = logger;
            _emailSender = emailSender;
            _config = appSettings.Value;
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

        [HttpPost("registration")]
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

                var frontendUrl = _config.FrontendUrl;
                var callbackUrl = $"{frontendUrl}/confirm-email?userId={userId}&code={code}";
                if (string.IsNullOrWhiteSpace(model.Email))
                {
                    return BadRequest("Email is required.");
                }
                await _emailSender.SendEmailAsync(model.Email, "Подтвердите почту",
                    $"Пожалуйста подтвердите аккаунт по ссылке <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>Нажать сюда</a>.");

                return Ok(new { message = "User registered successfully. Please confirm your email." });
            }

            return BadRequest(result.Errors);
        }

        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(code))
            {
                return BadRequest(new { success = false, message = "Некорректная ссылка." });
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound(new { success = false, message = "Пользователь не найден." });
            }

            var decodedCode = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code));
            var result = await _userManager.ConfirmEmailAsync(user, decodedCode);

            if (result.Succeeded)
            {
                return Ok(new { success = true, message = "Email успешно подтверждён!" });
            }

            return BadRequest(new { success = false, message = "Ошибка подтверждения." });
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
