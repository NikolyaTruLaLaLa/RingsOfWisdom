using mabyWorking.Data.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace mabyWorking.Models
{
    public class Stats
    {
        [Key]
        public long Id { get; set; }

        [Required, ForeignKey("User")]
        public string UserId { get; set; } = string.Empty;
        public ApplicationIdentityUser User { get; set; } = null!;

        public int Balance { get; set; } = 0;
        public int QuizLimit { get; set; } = 10;
        public int QuizPassed { get; set; } = 0;
        public int Xp { get; set; } = 0;

        [ForeignKey("Status")]
        public long? StatusId { get; set; }
        public Status? Status { get; set; }

        public ICollection<SkillStats> SkillStats { get; set; } = new List<SkillStats>();
    }
}
