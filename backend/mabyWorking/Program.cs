using mabyWorking.Data;
using mabyWorking.Data.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System;
using Microsoft.AspNetCore.Identity.UI.Services;
using mabyWorking.Services;
using NETCore.MailKit.Core;
using mabyWorking.Interfaces;
using mabyWorking.Configurations;

namespace mabyWorking
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            var jsonConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");

            var envConnectionString = Environment.GetEnvironmentVariable("DB_HOST") != null
                ? $"Host={Environment.GetEnvironmentVariable("DB_HOST")};" +
                  $"Port={Environment.GetEnvironmentVariable("DB_PORT")};" +
                  $"Database={Environment.GetEnvironmentVariable("DB_NAME")};" +
                  $"Username={Environment.GetEnvironmentVariable("DB_USER")};" +
                  $"Password={Environment.GetEnvironmentVariable("DB_PASSWORD")};"
                : null;

            var finalConnectionString = !string.IsNullOrWhiteSpace(jsonConnectionString) ? jsonConnectionString : envConnectionString;

            if (string.IsNullOrWhiteSpace(finalConnectionString))
            {
                throw new InvalidOperationException("Connection string not found in appsettings.json or environment variables.");
            }


            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(finalConnectionString).EnableSensitiveDataLogging());

            builder.Services.AddDatabaseDeveloperPageExceptionFilter();

            
            builder.Services.AddDefaultIdentity<ApplicationIdentityUser>(options =>
                options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<ApplicationDbContext>();

            
            builder.Services.ConfigureApplicationCookie(options =>
            {
                options.LoginPath = "/api/Login/login";
                options.AccessDeniedPath = "/api/Login/access-denied";
                options.Cookie.HttpOnly = true;
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                options.Cookie.SameSite = SameSiteMode.None;
                options.Cookie.Name = "AuthCookie";
            });


            //string frontendUrl = builder.Configuration["AppSettings:FrontendUrl"] ?? "http://localhost:5173";
            string[] frontendUrls = new[]
            {
                "https://ringsofwisdom.ru",
                "https://www.ringsofwisdom.ru"
            };

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp", policy =>
                {
                    policy.WithOrigins(frontendUrls)
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials()
                          .WithExposedHeaders("Set-Cookie");
                });
            });

            builder.Services.AddControllersWithViews();

            
            builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));
            builder.Services.Configure<AppSetittings>(builder.Configuration.GetSection("AppSettings"));
            builder.Services.AddTransient<Interfaces.IEmailSender, Services.EmailService>();

            builder.Services.AddHostedService<QuizResetService>();

            builder.Services.AddAuthorization();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseMigrationsEndPoint();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();

            app.UseCors("AllowReactApp");
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();
            app.Run();
        }
    }
}
