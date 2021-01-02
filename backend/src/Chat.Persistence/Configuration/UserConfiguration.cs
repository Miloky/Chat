using Chat.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Chat.Persistence.Configuration
{
    public class UserConfiguration: IEntityTypeConfiguration<ApplicationUser>
    {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Email).IsRequired().HasMaxLength(400);

            builder.HasIndex(x => x.Email).IsUnique();

            builder
                .HasMany<Message>(x => x.Messages)
                .WithOne(x => x.ApplicationUser)
                .HasForeignKey(x => x.UserId);


            builder
                .HasMany<UserRoom>(x => x.UserRooms)
                .WithOne(x => x.ApplicationUser)
                .HasForeignKey(x => x.UserId);
        }
    }
}