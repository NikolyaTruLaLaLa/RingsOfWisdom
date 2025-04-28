using mabyWorking.Data.Identity;
using mabyWorking.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace mabyWorking.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationIdentityUser, IdentityRole, string>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        { }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<Stats> Stats { get; set; }
        public DbSet<SkillStats> SkillStats { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<QuizStats> QuizStats { get; set; }
        public DbSet<PromoCode> PromoCodes { get; set; }
        public DbSet<UserPromoCode> UserPromoCodes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                entity.SetTableName(entity.GetTableName().ToLower());
            }
        }
    }
}
