using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using SPS.AEM.Database.Entities;

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
            modelBuilder.Entity<Login>().ToTable(nameof(Login)).HasKey(p => p.Id);
            modelBuilder.Entity<Login>().Property(p => p.Id).UseIdentityColumn();

            modelBuilder.Entity<User>().ToTable(nameof(User)).HasKey(p => p.Id);
            modelBuilder.Entity<User>().Property(p => p.Id).UseIdentityColumn();

            modelBuilder.Entity<Customer>().ToTable(nameof(Customer)).HasKey(p => p.Id);
            modelBuilder.Entity<Customer>().Property(p => p.Id).UseIdentityColumn();

            modelBuilder.Entity<LoadType>().ToTable(nameof(LoadType)).HasKey(p => p.Id);
            modelBuilder.Entity<LoadType>().Property(p => p.Id).UseIdentityColumn();

            modelBuilder.Entity<Role>().ToTable(nameof(Role)).HasKey(p => p.Id);
            modelBuilder.Entity<Role>().Property(p => p.Id).UseIdentityColumn();

            modelBuilder.Entity<District>().ToTable(nameof(District)).HasKey(p => p.Id);
            modelBuilder.Entity<District>().Property(p => p.Id).UseIdentityColumn();

            modelBuilder.Entity<Taluka>().ToTable(nameof(Taluka)).HasKey(p => p.Id);
            modelBuilder.Entity<Taluka>().HasOne(p => p.District).WithMany(p => p.Talukas);
            modelBuilder.Entity<Taluka>().Property(p => p.Id).UseIdentityColumn();

            modelBuilder.Entity<Village>().ToTable(nameof(Village)).HasKey(p => p.Id);
            modelBuilder.Entity<Village>().HasOne(p => p.Taluka).WithMany(p => p.Villages);
            modelBuilder.Entity<Village>().Property(p => p.Id).UseIdentityColumn();

            modelBuilder.Entity<Station>().ToTable(nameof(Station)).HasKey(p => p.Id);
            modelBuilder.Entity<Station>().HasOne(p => p.Taluka).WithMany(p => p.Stations)
                .OnDelete(DeleteBehavior.ClientSetNull);
            modelBuilder.Entity<Station>().HasOne(p => p.District).WithMany(p => p.Stations)
                .OnDelete(DeleteBehavior.ClientSetNull);
            modelBuilder.Entity<Station>().HasOne(p => p.Village).WithMany(p => p.Stations)
                .OnDelete(DeleteBehavior.ClientSetNull);
            modelBuilder.Entity<Station>().Property(p => p.Id).UseIdentityColumn();

            modelBuilder.Entity<Section>().ToTable(nameof(Section)).HasKey(p => p.Id);
            modelBuilder.Entity<Section>().HasOne(p => p.Station).WithMany(p => p.Sections)
                .OnDelete(DeleteBehavior.ClientSetNull);
            modelBuilder.Entity<Section>().Property(p => p.Id).UseIdentityColumn();

            modelBuilder.Entity<Feeder>().ToTable(nameof(Feeder)).HasKey(p => p.Id);
            modelBuilder.Entity<Feeder>().HasOne(p => p.Section).WithMany(p => p.Feeders)
                .OnDelete(DeleteBehavior.ClientSetNull);
            modelBuilder.Entity<Feeder>().Property(p => p.Id).UseIdentityColumn();

            modelBuilder.Entity<Transformer>().ToTable(nameof(Transformer)).HasKey(p => p.Id);
            modelBuilder.Entity<Transformer>().HasOne(p => p.Feeder).WithMany(p => p.Transformers)
                .OnDelete(DeleteBehavior.ClientSetNull);
            modelBuilder.Entity<Transformer>().Property(p => p.Id).UseIdentityColumn();

            modelBuilder.Entity<Device>().ToTable(nameof(Device)).HasKey(p => p.RRNo);
            modelBuilder.Entity<Device>().Property(p => p.RRNo).HasMaxLength(100);
            modelBuilder.Entity<Device>().Property(p => p.HubName).IsRequired().HasMaxLength(1000);
            modelBuilder.Entity<Device>().Property(p => p.DeviceId).IsRequired().HasMaxLength(1000);
            modelBuilder.Entity<Device>().Property(p => p.Status).IsRequired().HasMaxLength(100);

            modelBuilder.Entity<District>().HasData(new District { Id = 1, Name = "Bagalkot" });
            modelBuilder.Entity<Taluka>().HasData(new List<Taluka>
            {
                new Taluka {Id = 1, DistrictId = 1, Name = "Bagalkot"},
                new Taluka {Id = 2, DistrictId = 1, Name = "Badami"},
                new Taluka {Id = 3, DistrictId = 1, Name = "Mudhol"},
                new Taluka {Id = 4, DistrictId = 1, Name = "Jamakhandi"},
                new Taluka {Id = 5, DistrictId = 1, Name = "Hunagunda"},
                new Taluka {Id = 6, DistrictId = 1, Name = "Bilgi"},
                new Taluka {Id = 7, DistrictId = 1, Name = "Guledgudda"},
                new Taluka {Id = 8, DistrictId = 1, Name = "RabakaviBanahatti"}
            });

            modelBuilder.Entity<Role>().HasData(new Role {Id = 1, Name = "Admin", Description = "Admin"}, new Role { Id = 2, Name = "LineClerk", Description = "Line Clerk"});
            modelBuilder.Entity<LoadType>().HasData(new List<LoadType>
            {
                new LoadType{ Id = 1, Type = "LT1", Description = "Load test 1"},
                new LoadType{ Id = 2, Type = "LT2", Description = "Load test 2"},
                new LoadType{ Id = 3, Type = "LT3", Description = "Load test 3"},
                new LoadType{ Id = 4, Type = "LT4", Description = "Load test 4"}
            });
        }
    }
}
