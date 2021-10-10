using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SPS.AEM.Database.Entities;

namespace SPS.AEM.Database.EntityConfiguration
{
    public class TalukaConfiguration : IEntityTypeConfiguration<Taluka>
    {
        public void Configure(EntityTypeBuilder<Taluka> builder)
        {
            builder.ToTable(nameof(Taluka)).HasKey(p => p.Id);
            builder.HasOne(p => p.District).WithMany(p => p.Talukas);
            builder.Property(p => p.Id).UseIdentityColumn();

            builder.HasData(new List<Taluka>
            {
                new Taluka {Id = 1, DistrictId = 1, Name = "Bagalkot"},
                new Taluka {Id = 2, DistrictId = 1, Name = "Badami"},
                new Taluka {Id = 3, DistrictId = 1, Name = "Mudhol"},
                new Taluka {Id = 4, DistrictId = 1, Name = "Jamakhandi"},
                new Taluka {Id = 5, DistrictId = 1, Name = "Hunagunda"},
                new Taluka {Id = 6, DistrictId = 1, Name = "Bilgi"},
                new Taluka {Id = 7, DistrictId = 1, Name = "Guledgudda"},
                new Taluka {Id = 8, DistrictId = 1, Name = "RabakaviBanahatti"}
            });
        }
    }
}
