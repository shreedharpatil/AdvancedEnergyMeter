using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SPS.AEM.Database.Entities;

namespace SPS.AEM.Database.EntityConfiguration
{
    public class RoleConfiguration : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            builder.ToTable(nameof(Role)).HasKey(p => p.Id);
            builder.Property(p => p.Id).UseIdentityColumn();
            builder.HasData(new Role { Id = 1, Name = "Admin", Description = "Admin" }, new Role { Id = 2, Name = "LineClerk", Description = "Line Clerk" });
        }
    }
}
