
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace mabyWorking.Models
{
    public class Quiz
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }

        [Required, StringLength(256)]
        [Column("name")]
        public string Name { get; set; } = string.Empty;

        [ForeignKey("Skill")]
        [Column("skill_id")]
        public long SkillId { get; set; }
        public Skill Skill { get; set; } = null!;

        public ICollection<Question> Questions { get; set; } = new List<Question>();
    }
}
