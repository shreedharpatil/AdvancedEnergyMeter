using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using SPS.AEM.Repository.Models;

namespace SPS.AEM.Repository.Interfaces
{
    public interface IFeederRepository
    {
        Task<IEnumerable<FeederDto>> GetFeeders(int sectionId);

        Task AddFeeder(FeederDto feeder);
    }
}
