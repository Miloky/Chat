using Chat.Application.Interfaces;
using Chat.Domain;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Chat.Persistence
{
    public class ChatDbContext : ApiAuthorizationDbContext<ApplicationUser>, IChatDbContext
    {
        public ChatDbContext(DbContextOptions<ChatDbContext> options, IOptions<OperationalStoreOptions> o) : base(options, o) { }

        public DbSet<Message> Messages { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<UserRoom> UserRooms { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ChatDbContext).Assembly);
            base.OnModelCreating(modelBuilder);
        }
    }
}