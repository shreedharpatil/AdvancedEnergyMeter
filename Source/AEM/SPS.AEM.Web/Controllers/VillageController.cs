using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SPS.AEM.Repository.Interfaces;
using SPS.AEM.Repository.Models;

namespace SPS.AEM.Web.Controllers
{
    [ApiController]
    [Route("contextapi/village")]
    public class VillageController : ControllerBase
    {
        private readonly IVillageRepository villageRepository;

        public VillageController(IVillageRepository villageRepository)
        {
            this.villageRepository = villageRepository;
        }

        [HttpGet]
        [Microsoft.AspNetCore.Mvc.Route("{talukaId}")]
        public async Task<IActionResult> Get(int talukaId)
        {
            return this.Ok(await villageRepository.GetVillagesAsync(talukaId));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] VillageDto village)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await villageRepository.AddVillageAsync(village);
            return Created("contextapi/village", village);
        }
    }
}
