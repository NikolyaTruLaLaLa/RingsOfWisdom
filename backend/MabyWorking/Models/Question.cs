using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace mabyWorking.Models
{
    public class Question
    {
        [Key]
        public long Id { get; set; }

        [ForeignKey("Quiz")]
        public long QuizId { get; set; }
        public Quiz Quiz { get; set; } = null!;

        public string? Explanation { get; set; }

        [Required]
        public string Description { get; set; } = string.Empty;

        public int RewardRings { get; set; } = 0;
        public int RewardXp { get; set; } = 0;

        public ICollection<Answer> Answers { get; set; } = new List<Answer>();

    }
}