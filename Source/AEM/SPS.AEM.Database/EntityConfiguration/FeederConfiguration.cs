using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SPS.AEM.Database.Entities;

namespace SPS.AEM.Database.EntityConfiguration
{
    public class FeederConfiguration : IEntityTypeConfiguration<Feeder>
    {
        public void Configure(EntityTypeBuilder<Feeder> builder)
        {
            builder.ToTable(nameof(Feeder)).HasKey(p => p.Id);
            builder.HasOne(p => p.Section).WithMany(p => p.Feeders)
                .OnDelete(DeleteBehavior.ClientSetNull);
            builder.Property(p => p.Id).UseIdentityColumn();
        }
    }
}
