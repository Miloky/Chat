using Chat.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Chat.Persistence
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddPersistenceLayer(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddDbContext<ChatDbContext>(options =>
            {
                var connectionString =
                    configuration.GetConnectionString(PersistenceConfiguration.ChatDbContextConnectionStringName);
                options.UseMySql(connectionString);
            });

            services.AddScoped<IChatDbContext>(provider => provider.GetRequiredService<ChatDbContext>());

            return services;
        }
    }
}