using System.Collections.Generic;

namespace Chat.Domain
{
    public class Room
    {
        public Room()
        {
            UserRooms = new HashSet<UserRoom>();
            Messages = new HashSet<Message>();
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public ICollection<UserRoom> UserRooms { get; set; }
        public ICollection<Message> Messages { get; set; }
    }
}