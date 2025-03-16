
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace mabyWorking.Models
{
    public class Quiz
    {
        [Key]
        public long Id { get; set; }

        [Required, StringLength(256)]
        public string Name { get; set; } = string.Empty;

        [ForeignKey("Skill")]
        public long SkillId { get; set; }
        public Skill Skill { get; set; } = null!;

        public ICollection<Question> Questions { get; set; } = new List<Question>();
    }
}
