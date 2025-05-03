using System.ComponentModel.DataAnnotations;

namespace mabyWorking.Models
{
    public class PromoCode
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public int CoinReward { get; set; } 

        [Required]
        public int ExperienceReward { get; set; }

        [Required]
        public int ActivationLimit { get; set; } 
    }
}
