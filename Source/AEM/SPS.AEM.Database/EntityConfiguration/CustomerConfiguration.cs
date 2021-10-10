using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SPS.AEM.Database.Entities;

namespace SPS.AEM.Database.EntityConfiguration
{
    public class CustomerConfiguration : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {
            builder.ToTable(nameof(Customer)).HasKey(p => p.Id);
            builder.Property(p => p.Id).UseIdentityColumn();
        }
    }
}
