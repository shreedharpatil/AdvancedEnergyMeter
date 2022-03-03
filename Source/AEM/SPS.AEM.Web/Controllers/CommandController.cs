using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Devices;
using Microsoft.Extensions.Configuration;
using SPS.AEM.Repository.Interfaces;
using SPS.AEM.Web.Models.Dto;

namespace SPS.AEM.Web.Controllers
{
    [ApiController]
    [Route("contextapi/sendcommand")]
    public class CommandController : Controller
    {
        private readonly IDeviceRepository deviceRepository;
        private readonly IConfiguration configuration;

        public CommandController(IConfiguration configuration, IDeviceRepository deviceRepository)
        {
            this.configuration = configuration;
            this.deviceRepository = deviceRepository;
        }

        public async Task<IActionResult> Post([FromBody] CommandDto command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string connectionString = this.configuration["ConnectionStrings:EventHub"];
            var device = await deviceRepository.GetByIdAsync(command.RRNo);
            string deviceId = device.DeviceId;
            using (var serviceClient = ServiceClient.CreateFromConnectionString(connectionString))
            {
                
                var commandMessage = new Message(Encoding.UTF8.GetBytes(command.Command));
                commandMessage.Properties.Add(new KeyValuePair<string, string>("Command", command.Command));
                commandMessage.Ack = DeliveryAcknowledgement.Full;
                await serviceClient.SendAsync(deviceId, commandMessage);
            }

            return Ok();
        }
    }
}
