using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SPS.AEM.Repository.Interfaces;
using SPS.AEM.Repository.Models;

namespace SPS.AEM.Web.Controllers
{
    [ApiController]
    [Route("contextapi/loadtype")]
    public class LoadTypeController : ControllerBase
    {
        private readonly ILoadTypeRepository loadTypeRepository;

        public LoadTypeController(ILoadTypeRepository loadTypeRepository)
        {
            this.loadTypeRepository = loadTypeRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return this.Ok(await loadTypeRepository.GetAllLoadTypesAsync());
        }
    }
}
