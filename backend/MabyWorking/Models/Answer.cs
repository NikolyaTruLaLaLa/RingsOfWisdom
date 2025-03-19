using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace mabyWorking.Models
{
    public class Answer
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }

        [ForeignKey("Question")]
        [Column("question_id")]
        public long QuestionId { get; set; }
        public Question Question { get; set; } = null!;

        [Required]
        [Column("text")]
        public string Text { get; set; } = string.Empty;
    }
}
