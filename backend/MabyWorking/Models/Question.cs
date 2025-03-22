using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace mabyWorking.Models
{
    [Table("question")]
    public class Question
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }

        [ForeignKey("Quiz")]
        [Column("quiz_id")]
        public long QuizId { get; set; }
        public Quiz Quiz { get; set; } = null!;
        
        [Column("explanation")]
        public string? Explanation { get; set; }

        [Required]
        [Column("description")]
        public string Description { get; set; } = string.Empty;

        [Column("reward_rings")]
        public int RewardRings { get; set; } = 0;
        [Column("reward_xp")]
        public int RewardXp { get; set; } = 0;
        public ICollection<Answer> Answers { get; set; } = new List<Answer>();

    }
}