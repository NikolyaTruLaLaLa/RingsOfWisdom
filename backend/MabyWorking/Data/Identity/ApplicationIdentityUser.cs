using Microsoft.AspNetCore.Identity;

namespace mabyWorking.Data.Identity
{
    public class ApplicationIdentityUser : IdentityUser
    {
        public string UserName { get; set; }

    }
}
