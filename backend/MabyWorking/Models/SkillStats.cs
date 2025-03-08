using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace mabyWorking.Models
{
    public class SkillStats
    {
        [Key]
        public long Id { get; set; }

        [ForeignKey("Stats")]
        public long StatsId { get; set; }
        public Stats Stats { get; set; } = null!;

        [ForeignKey("Skill")]
        public long SkillId { get; set; }
        public Skill Skill { get; set; } = null!;

        public int QuestionsPassed { get; set; } = 0;
    }
}
