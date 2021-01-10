using System;
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
        private readonly ICurrentUserService _currentUserService;

        public CreateMessageCommandHandler(IChatDbContext chatDbContext, ICurrentUserService currentUserService)
        {
            _chatDbContext = chatDbContext;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(CreateMessageCommand request, CancellationToken cancellationToken)
        {
            var message = new Message
            {
                Id = Guid.NewGuid().ToString(),
                UserId = _currentUserService.UserId,
                RoomId = "1",
                Body = request.Message
            };

            await _chatDbContext.Messages.AddAsync(message, cancellationToken);
            await _chatDbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}