using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SPS.AEM.Repository.Interfaces;
using SPS.AEM.Repository.Models;

namespace SPS.AEM.Web.Controllers
{
    [ApiController]
    [Route("contextapi/taluka")]
    public class TalukaController : ControllerBase
    {
        private readonly ITalukaRepository talukaRepository;

        public TalukaController(ITalukaRepository talukaRepository)
        {
            this.talukaRepository = talukaRepository;
        }

        [HttpGet]
        [Microsoft.AspNetCore.Mvc.Route("{districtId}")]
        public async Task<IActionResult> Get(int districtId)
        {
            return this.Ok(await talukaRepository.GetTalukasAsync(districtId));
        }
    }
}
