namespace Chat.Domain
{
    public class Message
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public string RoomId { get; set; }
        public Room Room { get; set; }
        public string Body { get; set; }
    }
}