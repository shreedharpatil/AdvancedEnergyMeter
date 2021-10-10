using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SPS.AEM.Database.Entities;

namespace SPS.AEM.Database.EntityConfiguration
{
    public class StationConfiguration : IEntityTypeConfiguration<Station>
    {
        public void Configure(EntityTypeBuilder<Station> builder)
        {
            builder.ToTable(nameof(Station)).HasKey(p => p.Id);
            builder.HasOne(p => p.Taluka).WithMany(p => p.Stations)
                .OnDelete(DeleteBehavior.ClientSetNull);
            builder.HasOne(p => p.District).WithMany(p => p.Stations)
                .OnDelete(DeleteBehavior.ClientSetNull);
            builder.HasOne(p => p.Village).WithMany(p => p.Stations)
                .OnDelete(DeleteBehavior.ClientSetNull);
            builder.Property(p => p.Id).UseIdentityColumn();
        }
    }
}
