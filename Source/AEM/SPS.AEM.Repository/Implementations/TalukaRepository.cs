using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SPS.AEM.Database.Contexts;
using SPS.AEM.Repository.Interfaces;
using SPS.AEM.Repository.Models;

namespace SPS.AEM.Repository.Implementations
{
    public class TalukaRepository : ITalukaRepository
    {
        private readonly AemDatabaseContext context;

        public TalukaRepository(AemDatabaseContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<TalukaDto>> GetTalukasAsync(int districtId)
        {
            return context.Talukas.Where(p => p.DistrictId == districtId)
                .Select(p => new TalukaDto { Id = p.Id, Name = p.Name, DistrictId = p.DistrictId })
                .ToList();
        }
    }
}
