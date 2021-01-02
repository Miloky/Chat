namespace Chat.Domain
{
    public class UserRoom
    {
        public string UserId { get; set; }
        public  ApplicationUser ApplicationUser { get; set; }
        public string RoomId { get; set; }
        public Room Room { get; set; }
    }
}