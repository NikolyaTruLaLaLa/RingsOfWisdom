using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace mabyWorking.Models
{
    [Table("skill_stats")]
    public class SkillStats
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }

        [ForeignKey("Stats")]
        [Column("stats_id")]
        public long StatsId { get; set; }
        public Stats Stats { get; set; } = null!;

        [ForeignKey("Skill")]
        [Column("skill_id")]
        public long SkillId { get; set; }
        public Skill Skill { get; set; } = null!;
        [Column("questions_passed")]
        public int QuestionsPassed { get; set; } = 0;
    }
}
