using mabyWorking.Data.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace mabyWorking.Models
{
    public class Stats
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }

        [Required, ForeignKey("User")]
        [Column("user_id")]
        public string UserId { get; set; } = string.Empty;
        public ApplicationIdentityUser User { get; set; } = null!;
        [Column("balance")]
        public int Balance { get; set; } = 0;
        [Column("quiz_limit")]
        public int QuizLimit { get; set; } = 3;
        [Column("quiz_passed")]
        public int QuizPassed { get; set; } = 0;
        [Column("xp")]
        public int Xp { get; set; } = 0;

        [ForeignKey("Status")]
        [Column("status_id")]
        public long? StatusId { get; set; }
        public Status? Status { get; set; }

        public ICollection<SkillStats> SkillStats { get; set; } = new List<SkillStats>();
    }
}
