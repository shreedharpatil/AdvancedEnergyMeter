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
    public class TransformerRepository : ITransformerRepository
    {
        private readonly AemDatabaseContext context;

        public TransformerRepository(AemDatabaseContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<TransformerDto>> GetTransformers(int feederId)
        {
            return await context.Transformers.Where(p => p.FeederId == feederId)
                .Select(p => new TransformerDto{ Id = p.Id, Name = p.Name, FeederId = p.FeederId})
                .ToListAsync();
        }

        public async Task AddTransformer(TransformerDto transformer)
        {
            context.Transformers.Add(new Transformer{ Name = transformer.Name, FeederId = transformer.FeederId });
            await context.SaveChangesAsync();
        }
    }
}
