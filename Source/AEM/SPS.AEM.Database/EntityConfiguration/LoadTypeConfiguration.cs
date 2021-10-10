using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SPS.AEM.Database.Entities;

namespace SPS.AEM.Database.EntityConfiguration
{
    public class LoadTypeConfiguration : IEntityTypeConfiguration<LoadType>
    {
        public void Configure(EntityTypeBuilder<LoadType> builder)
        {
            builder.ToTable(nameof(LoadType)).HasKey(p => p.Id);
            builder.Property(p => p.Id).UseIdentityColumn();
            builder.HasData(new List<LoadType>
            {
                new LoadType{ Id = 1, Type = "LT1", Description = "Load test 1"},
                new LoadType{ Id = 2, Type = "LT2", Description = "Load test 2"},
                new LoadType{ Id = 3, Type = "LT3", Description = "Load test 3"},
                new LoadType{ Id = 4, Type = "LT4", Description = "Load test 4"}
            });
        }
    }
}
