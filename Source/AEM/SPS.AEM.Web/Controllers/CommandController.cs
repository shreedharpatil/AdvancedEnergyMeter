using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Devices;
using Microsoft.Extensions.Configuration;
using SPS.AEM.Web.Models.Dto;

namespace SPS.AEM.Web.Controllers
{
    [ApiController]
    [Route("contextapi/sendcommand")]
    public class CommandController : Controller
    {
        private readonly IConfiguration configuration;

        public CommandController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public async Task<IActionResult> Post([FromBody] CommandDto command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string connectionString = this.configuration["ConnectionStrings:EventHub"];
            string deviceId = "MyFirstIoTHubDevice";
            using (var serviceClient = ServiceClient.CreateFromConnectionString(connectionString))
            {
                var commandMessage = new Message();
                commandMessage.Properties.Add(new KeyValuePair<string, string>("Command", command.Command));
                commandMessage.Ack = DeliveryAcknowledgement.Full;
                await serviceClient.SendAsync(deviceId, commandMessage);
            }

            return Ok();
        }
    }
}
