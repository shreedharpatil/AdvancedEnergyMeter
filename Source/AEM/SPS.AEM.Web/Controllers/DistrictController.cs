using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SPS.AEM.Repository.Interfaces;
using SPS.AEM.Repository.Models;

namespace SPS.AEM.Web.Controllers
{
    [ApiController]
    [Route("contextapi/district")]
    public class DistrictController : ControllerBase
    {
        private readonly IDistrictRepository districtRepository;

        public DistrictController(IDistrictRepository districtRepository)
        {
            this.districtRepository = districtRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return this.Ok(await districtRepository.GetAllDistrictsAsync());
        }
    }
}
