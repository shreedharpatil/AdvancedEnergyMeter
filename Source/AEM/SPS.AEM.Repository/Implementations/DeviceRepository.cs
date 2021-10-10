using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SPS.AEM.Database.Contexts;
using SPS.AEM.Database.Entities;
using SPS.AEM.Repository.Interfaces;

namespace SPS.AEM.Repository.Implementations
{
    public class DeviceRepository : IDeviceRepository
    {
        private readonly AemDatabaseContext context;

        public DeviceRepository(AemDatabaseContext context)
        {
            this.context = context;
        }

        public Task<Device> GetByIdAsync(string deviceIdentifier)
        {
            return context.Devices.FirstOrDefaultAsync(p => p.RRNo == deviceIdentifier);
        }

        public Task SaveAsync(Device device)
        {
            context.Devices.Add(device);
            return context.SaveChangesAsync();
        }
    }
}
