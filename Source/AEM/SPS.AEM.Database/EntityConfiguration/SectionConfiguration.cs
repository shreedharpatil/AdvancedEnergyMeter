using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SPS.AEM.Database.Entities;

namespace SPS.AEM.Database.EntityConfiguration
{
    public class SectionConfiguration : IEntityTypeConfiguration<Section>
    {
        public void Configure(EntityTypeBuilder<Section> builder)
        {
            builder.ToTable(nameof(Section)).HasKey(p => p.Id);
            builder.HasOne(p => p.Station).WithMany(p => p.Sections)
                .OnDelete(DeleteBehavior.ClientSetNull);
            builder.Property(p => p.Id).UseIdentityColumn();
        }
    }
}
