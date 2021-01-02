using MediatR;

namespace Chat.Application.Messages.Commands.CreateMessage
{
    public class CreateMessageCommand: IRequest
    {
        public string Message { get; set; }
    }
}