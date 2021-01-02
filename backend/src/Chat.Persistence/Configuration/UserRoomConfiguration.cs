using Chat.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Chat.Persistence.Configuration
{
    public class UserRoomConfiguration : IEntityTypeConfiguration<UserRoom>
    {
        public void Configure(EntityTypeBuilder<UserRoom> builder)
        {
            builder.HasKey(x => new { x.RoomId, x.UserId });

            builder
                .HasOne<Room>(x => x.Room)
                .WithMany(x => x.UserRooms)
                .HasForeignKey(x => x.RoomId);

            builder
                .HasOne<ApplicationUser>(x => x.ApplicationUser)
                .WithMany(x => x.UserRooms)
                .HasForeignKey(x => x.UserId);
        }
    }
}