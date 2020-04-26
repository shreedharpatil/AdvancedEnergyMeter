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
    public class StationRepository : IStationRepository
    {
        private readonly AemDatabaseContext context;

        public StationRepository(AemDatabaseContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<StationDto>> GetStationsAsync(int villageId)
        {
            return await context.Stations.Where(p => p.VillageId == villageId)
                .Select(p => new StationDto { Id = p.Id, Name = p.Name, DistrictId = p.DistrictId, TalukaId = p.TalukaId, VillageId = p.VillageId })
                .ToListAsync();
        }

        public async Task AddStationAsync(StationDto station)
        {
            context.Stations.Add(new Station { Name = station.Name, DistrictId = station.DistrictId, TalukaId = station.TalukaId, VillageId = station.VillageId });
            await context.SaveChangesAsync();
        }
    }
}
