using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
namespace mabyWorking.Models
{
    public class Skill
    {
        [Key]
        public long Id { get; set; }

        [Required, StringLength(256)]
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        public ICollection<Quiz> Quizzes { get; set; } = new List<Quiz>();
    }
}