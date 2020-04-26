using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SPS.AEM.Repository.Interfaces;
using SPS.AEM.Repository.Models;

namespace SPS.AEM.Web.Controllers
{
    [ApiController]
    [Route("contextapi/station")]
    public class StationController : ControllerBase
    {
        private readonly IStationRepository stationRepository;

        public StationController(IStationRepository stationRepository)
        {
            this.stationRepository = stationRepository;
        }

        [HttpGet]
        [Microsoft.AspNetCore.Mvc.Route("{villageId}")]
        public async Task<IActionResult> Get(int villageId)
        {
            return this.Ok(await stationRepository.GetStationsAsync(villageId));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] StationDto station)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await stationRepository.AddStationAsync(station);
            return Created("contextapi/station", station);
        }
    }
}
