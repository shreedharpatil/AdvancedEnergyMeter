using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Devices;
using Microsoft.Extensions.Configuration;
using SPS.AEM.Repository.Interfaces;
using SPS.AEM.Repository.Models;
using SPS.AEM.Web.Commands;

namespace SPS.AEM.Web.Controllers
{
    [ApiController]
    [Route("contextapi/device")]
    public class DeviceController : Controller
    {
        private readonly IDeviceRepository deviceRepository;
        private readonly IProvisionDeviceCommandHandler provisionDeviceCommandHandler;
        private readonly IConfiguration configuration;

        public DeviceController(IDeviceRepository deviceRepository, IProvisionDeviceCommandHandler provisionDeviceCommandHandler, IConfiguration configuration)
        {
            this.deviceRepository = deviceRepository;
            this.provisionDeviceCommandHandler = provisionDeviceCommandHandler;
            this.configuration = configuration;
        }

        [HttpGet]
        [Route("{deviceIdentifier}")]
        public async Task<IActionResult> Get(string deviceIdentifier)
        {
            var device = await deviceRepository.GetByIdAsync(deviceIdentifier);
            if (device != null)
            {
                var registryManager = RegistryManager.CreateFromConnectionString(configuration["Settings:IotHubConnectionString"]);
                var dev = await registryManager.GetDeviceAsync(device.DeviceId);
                var sk = dev.Authentication.SymmetricKey.SecondaryKey;
                var deviceDto = new DeviceDto
                {
                    DeviceId = device.DeviceId,
                    FullyQualifiedHubName = device.HubName,
                    DeviceKey = sk
            };

                return Ok(deviceDto);
            }

            return NotFound();
        }

        [HttpPost]
        [Route("{customerId}")]
        public async Task<IActionResult> Post(int customerId)
        {
            var message = await provisionDeviceCommandHandler.ProvisionDevice(customerId);
            return Ok(message);
        }
    }
}
