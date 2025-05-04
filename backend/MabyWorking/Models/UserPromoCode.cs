using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using mabyWorking.Data.Identity;

namespace mabyWorking.Models
{
    public class UserPromoCode
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        public string UserId { get; set; }
        public ApplicationIdentityUser User { get; set; }

        [Required]
        [ForeignKey(nameof(PromoCode))]
        public int PromoCodeId { get; set; }
        public PromoCode PromoCode { get; set; }
    }
}
