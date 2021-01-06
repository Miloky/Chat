using System;
using System.Security.Claims;
using Chat.Application.Interfaces;
using Chat.Domain;
using Microsoft.AspNetCore.Http;

namespace Chat.Api.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _contextAccessor;
        public CurrentUserService(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }

        public string UserId => _contextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

        public ApplicationUser GetUserAsync()
        {
            throw new NotImplementedException();
        }
    }
}