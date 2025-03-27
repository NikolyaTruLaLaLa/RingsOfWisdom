using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mabyWorking.Models
{
    [Table("quiz_stats")]
    public class QuizStats
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }

        [ForeignKey("Stats")]
        [Column("stats_id")]
        public long StatsId { get; set; }
        public Stats Stats { get; set; } = null!;

        [ForeignKey("Quiz")]
        [Column("quiz_id")]
        public long QuizId { get; set; }
        public Quiz Quiz { get; set; } = null!;
        [Column("is_passed")]
        public bool IsPassed { get; set; } = false;
    }
}
