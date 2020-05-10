using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SPS.AEM.Database.Contexts;
using SPS.AEM.Database.Entities;
using SPS.AEM.Repository.Interfaces;
using SPS.AEM.Repository.Models;

namespace SPS.AEM.Repository.Implementations
{
    public class VillageRepository : IVillageRepository
    {
        private readonly AemDatabaseContext context;

        public VillageRepository(AemDatabaseContext context)
        {
            this.context = context;
        }

        public async Task AddVillageAsync(VillageDto village)
        {
            var villageToBeSaved = new Village {Name = village.Name, TalukaId = village.TalukaId};
            context.Villages.Add(villageToBeSaved);
            await context.SaveChangesAsync();
            village.Id = villageToBeSaved.Id;
        }

        public async Task<IEnumerable<VillageDto>> GetVillagesAsync(int talukaId)
        {
            return await context.Villages.Where(p => p.TalukaId == talukaId)
                .Select(p => new VillageDto { Id = p.Id, Name = p.Name, TalukaId = p.TalukaId })
                .ToListAsync();
        }
    }
}
