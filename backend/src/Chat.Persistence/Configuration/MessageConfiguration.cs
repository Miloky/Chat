using Chat.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Chat.Persistence.Configuration
{
    public class MessageConfiguration : IEntityTypeConfiguration<Message>
    {
        public void Configure(EntityTypeBuilder<Message> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Body).HasMaxLength(700).IsRequired();


            builder
                .HasOne(x => x.ApplicationUser)
                .WithMany(x => x.Messages)
                .HasForeignKey(x => x.UserId);

            builder
                .HasOne(x => x.Room)
                .WithMany(x => x.Messages)
                .HasForeignKey(x => x.RoomId);
        }
    }
}