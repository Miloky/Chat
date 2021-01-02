using System.Threading;
using System.Threading.Tasks;
using Chat.Domain;
using Microsoft.EntityFrameworkCore;

namespace Chat.Application.Interfaces
{
    public interface IChatDbContext
    {
        DbSet<Message> Messages { get; set; }
        DbSet<UserRoom> UserRooms { get; set; }
        DbSet<ApplicationUser> Users { get; set; }
        DbSet<Room> Rooms { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken());
    }
}