using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace mabyWorking.Models
{
    public class Answer
    {
        [Key]
        public long Id { get; set; }

        [ForeignKey("Question")]
        public long QuestionId { get; set; }
        public Question Question { get; set; } = null!;

        [Required]
        public string Text { get; set; } = string.Empty;
    }
}
