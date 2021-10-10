using Microsoft.EntityFrameworkCore;
using SPS.AEM.Database.Entities;
using SPS.AEM.Database.EntityConfiguration;

namespace SPS.AEM.Database.Contexts
{
    public class AemDatabaseContext : DbContext
    {
        public AemDatabaseContext(DbContextOptions options)
        : base(options)
        {
        }

        public DbSet<Login> Logins { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Customer> Customers { get; set; }

        public DbSet<LoadType> LoadTypes { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<District> Districts { get; set; }

        public DbSet<Taluka> Talukas { get; set; }

        public DbSet<Village> Villages { get; set; }

        public DbSet<Station> Stations { get; set; }

        public DbSet<Section> Sections { get; set; }

        public DbSet<Feeder> Feeders { get; set; }

        public DbSet<Transformer> Transformers { get; set; }

        public DbSet<Device> Devices { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(LoginConfiguration).Assembly);
        }
    }
}
