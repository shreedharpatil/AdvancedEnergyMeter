using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SPS.AEM.Database.Entities;

namespace SPS.AEM.Database.EntityConfiguration
{
    public class DeviceConfiguration : IEntityTypeConfiguration<Device>
    {
        public void Configure(EntityTypeBuilder<Device> builder)
        {
            builder.ToTable(nameof(Device)).HasKey(p => p.RRNo);
            builder.Property(p => p.RRNo).HasMaxLength(100);
            builder.Property(p => p.HubName).IsRequired().HasMaxLength(1000);
            builder.Property(p => p.DeviceId).IsRequired().HasMaxLength(1000);
            builder.Property(p => p.Status).IsRequired().HasMaxLength(100);
        }
    }
}
