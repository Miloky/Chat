using System;
using System.IO;
using IdentityServer4.EntityFramework.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace Chat.Persistence
{
    public abstract class DesignTimeDbContextFactoryBase<TContext> : IDesignTimeDbContextFactory<TContext> where TContext : DbContext
    {
        private const string EnvironmentName = "ASPNETCORE_ENVIRONMENT";
        public TContext CreateDbContext(string[] args)
        {
            return CreateNewInstance();
        }

        protected IConfiguration GetConfiguration(string basePath)
        {
            var env = Environment.GetEnvironmentVariable(EnvironmentName);
            IConfiguration configuration = new ConfigurationBuilder()
                .AddEnvironmentVariables()
                .SetBasePath(basePath)
                .AddJsonFile("appsettings.json", false)
                .AddJsonFile($"appsettings.{env}.json", true)
                .AddJsonFile("appsettings.Local.json", true)
                .Build();

            return configuration;
        }

        protected string GetBasePath()
        {
            return Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).FullName, "Chat.Api");
        }

        protected ChatDbContext Create(string connectionStringName)
        {
            var basePath = GetBasePath();
            var configuration = GetConfiguration(basePath);
            var connectionString = configuration.GetConnectionString(connectionStringName);

            if (String.IsNullOrEmpty(connectionString))
            {
                throw new ArgumentException(
                    $"Connection string({connectionStringName}:{connectionString}) was not found!");
            }

            var dbContextOptionsBuilder = new DbContextOptionsBuilder<ChatDbContext>();
            dbContextOptionsBuilder.UseMySql(connectionString);

            return new ChatDbContext(dbContextOptionsBuilder.Options, new Test());
        }

        protected abstract TContext CreateNewInstance();
        
        public class Test: IOptions<OperationalStoreOptions>
        {
            public OperationalStoreOptions Value { get; } = new OperationalStoreOptions();
        }
    }
}