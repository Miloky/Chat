using System.Threading;
using System.Threading.Tasks;
using Chat.Application.Interfaces;
using Chat.Domain;
using MediatR;

namespace Chat.Application.Messages.Commands.CreateMessage
{
    public class CreateMessageCommandHandler : IRequestHandler<CreateMessageCommand, Unit>
    {
        private readonly IChatDbContext _chatDbContext;

        public CreateMessageCommandHandler(IChatDbContext chatDbContext)
        {
            _chatDbContext = chatDbContext;
        }

        public async Task<Unit> Handle(CreateMessageCommand request, CancellationToken cancellationToken)
        {
            //var message = new Message
            //{
            //    UserId = 1,
            //    RoomId = 1,
            //    Body = request.Message
            //};

            //await _chatDbContext.Messages.AddAsync(message, cancellationToken);
            //await _chatDbContext.SaveChangesAsync(cancellationToken);
            
            return Unit.Value;
        }
    }
}