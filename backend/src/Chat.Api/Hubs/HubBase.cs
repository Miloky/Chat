using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;

namespace Chat.Api.Hubs
{
    public abstract class HubBase : Hub
    {
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??= Context.GetHttpContext().RequestServices.GetService<IMediator>();
    }
}