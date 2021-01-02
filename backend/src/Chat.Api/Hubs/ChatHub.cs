using System.Threading.Tasks;
using Chat.Application.Messages.Commands.CreateMessage;
using Microsoft.AspNetCore.SignalR;

namespace Chat.Api.Hubs
{
    public class ChatHub : HubBase
    {
        public async Task SendMessage(CreateMessageCommand command)
        {
            await Mediator.Send(command, Context.ConnectionAborted);
            await Clients.All.SendAsync("ReceiveMessage", command.Message, Context.ConnectionAborted);
        }
    }
}