using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mabyWorking.Models
{
    public class Course
    {

        [Key]
        [Column("id")]
        public long Id { get; set; }

        [Required]
        [Column("name")]
        public string Name { get; set; } = string.Empty;

        [Required]
        [Column("text")]
        public string Text { get; set; } = string.Empty;

        [Column("link")]
        public string? Link { get; set; }
    }
}
