using System.Security.Claims;
using System.Threading.Tasks;
using Chat.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Chat.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Produces("application/json")]
    public class MessagesController: ControllerBase
    {
        private readonly IChatDbContext _dbContext;

        public MessagesController(IChatDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("/api/messages")]
        public async Task<IActionResult> Messages()
        {
            var messages = await _dbContext.Messages.ToListAsync();
            return Ok(messages);
        }
    }
}