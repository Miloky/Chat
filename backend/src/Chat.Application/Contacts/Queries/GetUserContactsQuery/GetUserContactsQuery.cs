using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Chat.Application.Interfaces;
using Chat.Domain;
using MediatR;

namespace Chat.Application.Contacts.Queries.GetUserContactsQuery
{
    public class GetUserContactsQuery : IRequest<IEnumerable<ContactViewModel>> { }

    public class ContactViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }


        public static ContactViewModel Projection(ApplicationUser user) => new ContactViewModel
        {
            Id = user.Id,
            Name = user.UserName,
            Email = user.Email
        };
    }

    public class GetUserContactsQueryHandler : IRequestHandler<GetUserContactsQuery, IEnumerable<ContactViewModel>>
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly IChatDbContext _chatDbContext;

        public GetUserContactsQueryHandler(ICurrentUserService currentUserService, IChatDbContext chatDbContext)
        {
            _currentUserService = currentUserService;
            _chatDbContext = chatDbContext;
        }

        public async Task<IEnumerable<ContactViewModel>> Handle(GetUserContactsQuery request, CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;
            //TODO: Fix
            var contacts = _chatDbContext.Users
                .Where(contact => contact.Id != userId)
                .Select(ContactViewModel.Projection);
            return contacts;
        }
    }
}