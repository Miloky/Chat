using System;
using System.Threading;
using System.Threading.Tasks;
using Chat.Application.Interfaces;
using Chat.Domain;
using Chat.Domain.Common;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Chat.Persistence
{
    public class ChatDbContext : ApiAuthorizationDbContext<ApplicationUser>, IChatDbContext
    {
        private readonly ICurrentUserService _currentUserService;
        public ChatDbContext(DbContextOptions<ChatDbContext> options, IOptions<OperationalStoreOptions> o) : base(options, o) { }

        public ChatDbContext(ICurrentUserService currentUserService, DbContextOptions<ChatDbContext> options, IOptions<OperationalStoreOptions> o) :
            base(options, o)
        {
            _currentUserService = currentUserService;
        }


        public DbSet<Message> Messages { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<UserRoom> UserRooms { get; set; }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedBy = _currentUserService.UserId;
                        entry.Entity.CreatedOn = new DateTime();
                        entry.Entity.ModifiedBy = _currentUserService.UserId;
                        entry.Entity.ModifiedOn = new DateTime();
                        break;
                    case EntityState.Modified:
                        entry.Entity.ModifiedBy = _currentUserService.UserId;
                        entry.Entity.ModifiedOn = new DateTime();
                        break;
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ChatDbContext).Assembly);
            base.OnModelCreating(modelBuilder);
        }
    }
}