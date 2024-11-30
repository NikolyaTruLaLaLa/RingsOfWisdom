using mabyWorking.Models;
using Microsoft.EntityFrameworkCore;

namespace mabyWorking.DAL
{
    public class ROWContext : DbContext
    {
        public ROWContext(DbContextOptions<ROWContext> options) : base(options)
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<Progress_in_skills> Progresses_In_Skills { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<Direction> Directions { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Solved_question> SolvedQuestions { get; set; }
        public DbSet<Area> Area { get; set; }
        public DbSet<User_expirience_in_areas> User_expirience_in_area { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<Progress_in_skills>().ToTable("Progress_in_skills");
            modelBuilder.Entity<Skill>().ToTable("Skill");
            modelBuilder.Entity<Direction>().ToTable("Direction");
            modelBuilder.Entity<Question>().ToTable("Question");
            modelBuilder.Entity<Solved_question>().ToTable("Question");
            modelBuilder.Entity<Area>().ToTable("Area");
            modelBuilder.Entity<User_expirience_in_areas>().ToTable("User_expirience_in_area");

        }
    }
}
