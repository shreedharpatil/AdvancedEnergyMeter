using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SPS.AEM.Repository.Interfaces;
using SPS.AEM.Repository.Models;

namespace SPS.AEM.Web.Controllers
{
    [ApiController]
    [Route("contextapi/section")]
    public class SectionController : ControllerBase
    {
        private readonly ISectionRepository sectionRepository;

        public SectionController(ISectionRepository sectionRepository)
        {
            this.sectionRepository = sectionRepository;
        }

        [HttpGet]
        [Microsoft.AspNetCore.Mvc.Route("{stationId}")]
        public async Task<IActionResult> Get(int stationId)
        {
            return this.Ok(await sectionRepository.GetSectionsAsync(stationId));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SectionDto section)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await sectionRepository.AddSectionAsync(section);
            return Created("contextapi/section", section);
        }
    }
}
