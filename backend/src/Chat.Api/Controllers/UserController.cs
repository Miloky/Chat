using System.Threading.Tasks;
using Chat.Application.Contacts.Queries.GetUserContactsQuery;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Chat.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class UserController : BaseController
    {
        [HttpGet("contacts")]
        public async Task<IActionResult> Contacts()
        {
            var contacts = await Mediator.Send(new GetUserContactsQuery());
            return Ok(contacts);
        }
    }
}