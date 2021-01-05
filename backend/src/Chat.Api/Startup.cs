using System;
using Chat.Api.Hubs;
using Chat.Application.Interfaces;
using Chat.Application.Messages.Commands.CreateMessage;
using Chat.Domain;
using Chat.Persistence;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Logging;

namespace Chat.Api
{
  public class Startup
    {
        private const string ChatCorsPolicyName = "ChatCorsPolicy";
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMediatR(typeof(CreateMessageCommand).Assembly);
            services.AddSignalR();
            services.AddControllersWithViews();
            services.AddRazorPages();

            services.AddDbContext<ChatDbContext>(options =>
            {
                var connectionString =
                    _configuration.GetConnectionString(PersistenceConfiguration.ChatDbContextConnectionStringName);
                options.UseMySql(connectionString);
            });

            services.AddScoped<IChatDbContext>(provider => provider.GetRequiredService<ChatDbContext>());

            services.AddCors(options =>
            {
                options.AddPolicy(ChatCorsPolicyName, configurePolicy =>
                {
                    var allowedOrigins = _configuration.GetSection("AllowedOrigins").Get<string[]>();
                    Console.WriteLine(allowedOrigins);
                    configurePolicy.AllowAnyHeader();
                    configurePolicy.AllowAnyMethod();
                    configurePolicy.AllowCredentials();
                    configurePolicy.WithOrigins(allowedOrigins);
                });
            });

            services.AddDefaultIdentity<ApplicationUser>()
                .AddEntityFrameworkStores<ChatDbContext>();

            services.AddIdentityServer()
                .AddApiAuthorization<ApplicationUser, ChatDbContext>();

            services
                .AddAuthentication()
                .AddIdentityServerJwt();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                IdentityModelEventSource.ShowPII = true;
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();

            app.UseRouting();
            app.UseCors(ChatCorsPolicyName);
            app.UseAuthentication();
            app.UseIdentityServer();
            app.UseAuthorization();

            app.UseEndpoints(routeBuilder =>
            {
                routeBuilder.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                routeBuilder.MapRazorPages();
                routeBuilder.MapHub<ChatHub>("/chathub");
            });
        }
    }
}
