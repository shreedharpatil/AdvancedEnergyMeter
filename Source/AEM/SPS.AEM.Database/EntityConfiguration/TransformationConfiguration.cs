using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SPS.AEM.Database.Entities;

namespace SPS.AEM.Database.EntityConfiguration
{
    public class TransformationConfiguration : IEntityTypeConfiguration<Transformer>
    {
        public void Configure(EntityTypeBuilder<Transformer> builder)
        {
            builder.ToTable(nameof(Transformer)).HasKey(p => p.Id);
            builder.HasOne(p => p.Feeder).WithMany(p => p.Transformers)
                .OnDelete(DeleteBehavior.ClientSetNull);
            builder.Property(p => p.Id).UseIdentityColumn();
        }
    }
}
