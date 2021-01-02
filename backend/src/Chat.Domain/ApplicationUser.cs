using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Chat.Domain
{
    public class ApplicationUser: IdentityUser
    {
        public ApplicationUser()
        {
            UserRooms = new HashSet<UserRoom>();
            Messages = new HashSet<Message>();
        }
        public ICollection<UserRoom> UserRooms { get; set; }
        public ICollection<Message> Messages { get; set; }
    }
}