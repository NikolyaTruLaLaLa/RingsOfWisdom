using mabyWorking.Models;
using System.ComponentModel.DataAnnotations.Schema;

public class QuizAccessRequirement
{
    public int Id { get; set; }
    [ForeignKey("Quiz")]
    [Column("quizid")]
    public long QuizId { get; set; }
    public Quiz Quiz { get; set; }
    [ForeignKey("Status")]
    [Column("requiredstatusid")]
    public long RequiredStatusId { get; set; }
    public Status RequiredStatus { get; set; }
}
