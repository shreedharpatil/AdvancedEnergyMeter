using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SPS.AEM.Database.Entities;

namespace SPS.AEM.Database.EntityConfiguration
{
    public class VillageConfiguration : IEntityTypeConfiguration<Village>
    {
        public void Configure(EntityTypeBuilder<Village> builder)
        {
            builder.ToTable(nameof(Village)).HasKey(p => p.Id);
            builder.HasOne(p => p.Taluka).WithMany(p => p.Villages);
            builder.Property(p => p.Id).UseIdentityColumn();
        }
    }
}
