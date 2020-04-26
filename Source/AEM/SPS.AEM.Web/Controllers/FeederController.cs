using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SPS.AEM.Repository.Interfaces;
using SPS.AEM.Repository.Models;

namespace SPS.AEM.Web.Controllers
{
    [ApiController]
    [Route("contextapi/feeder")]
    public class FeederController : ControllerBase
    {
        private readonly IFeederRepository feederRepository;

        public FeederController(IFeederRepository feederRepository)
        {
            this.feederRepository = feederRepository;
        }

        [HttpGet]
        [Microsoft.AspNetCore.Mvc.Route("{sectionId}")]
        public async Task<IActionResult> Get(int sectionId)
        {
            return this.Ok(await feederRepository.GetFeedersAsync(sectionId));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] FeederDto feeder)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await feederRepository.AddFeederAsync(feeder);
            return Created("contextapi/feeder", feeder);
        }
    }
}
