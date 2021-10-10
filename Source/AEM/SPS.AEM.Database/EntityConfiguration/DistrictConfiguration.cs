using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SPS.AEM.Database.Entities;

namespace SPS.AEM.Database.EntityConfiguration
{
    public class DistrictConfiguration : IEntityTypeConfiguration<District>
    {
        public void Configure(EntityTypeBuilder<District> builder)
        {
            builder.ToTable(nameof(District)).HasKey(p => p.Id);
            builder.Property(p => p.Id).UseIdentityColumn();
            builder.HasData(new District { Id = 1, Name = "Bagalkot" });
        }
    }
}
