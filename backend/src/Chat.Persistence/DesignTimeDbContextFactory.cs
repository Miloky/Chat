namespace Chat.Persistence
{
    public class DesignTimeDbContextFactory : DesignTimeDbContextFactoryBase<ChatDbContext>
    {
        protected override ChatDbContext CreateNewInstance()
        {
            return Create(PersistenceConfiguration.ChatDbContextConnectionStringName);
        }
    }
}