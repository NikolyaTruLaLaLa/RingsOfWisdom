using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace mabyWorking.Models
{
    public class Status
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }

        [Required]
        [Column("name")]
        public string Name { get; set; } = string.Empty;

        public int MinXp { get; set; } = 0;
        [Column("isdefault")]
        public bool IsDefault { get; set; } = false;
    }
}
