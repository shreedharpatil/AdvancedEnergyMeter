using System.Threading.Tasks;
using SPS.AEM.Database.Entities;

namespace SPS.AEM.Repository.Interfaces
{
    public interface IDeviceRepository
    {
        Task<Device> GetByIdAsync(string deviceIdentifier);

        Task SaveAsync(Device device);
    }
}
