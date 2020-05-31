using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SPS.AEM.Shared;

namespace SPS.AEM.Web.Controllers
{
    [ApiController]
    [Route("eventData")]
    public class EventDataController : Controller
    {
        [HttpPost]
        public IActionResult Post([FromBody] EventData eventData)
        {
            if (eventData == null)
            {
                return Ok();
            }


            return Ok();
        }
    }
}
