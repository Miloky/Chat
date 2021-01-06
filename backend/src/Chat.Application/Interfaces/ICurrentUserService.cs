using System;
using Chat.Domain;

namespace Chat.Application.Interfaces
{
    public interface ICurrentUserService
    {
        string UserId { get; }
        ApplicationUser GetUserAsync();
    }
}