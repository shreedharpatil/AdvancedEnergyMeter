using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SPS.AEM.Shared;
using SPS.AEM.Web.Hub;

namespace SPS.AEM.Web.Controllers
{
    [ApiController]
    [Route("eventData")]
    public class EventDataController : Controller
    {
        private IHubContext<AemHub> hub;

        public EventDataController(IHubContext<AemHub> hub)
        {
            this.hub = hub;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EventData eventData)
        {
            if (eventData == null)
            {
                return Ok();
            }

            await hub.Clients.All.SendAsync("eventReceived", eventData);
            return Ok();
        }
    }
}
