using System.ComponentModel.DataAnnotations;

namespace mabyWorking.Models
{
    public class Course
    {
        [Key]
        public long Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Text { get; set; } = string.Empty;

        public string? Link { get; set; }
    }
}
