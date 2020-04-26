using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SPS.AEM.Repository.Interfaces;
using SPS.AEM.Repository.Models;

namespace SPS.AEM.Web.Controllers
{
    [ApiController]
    [Microsoft.AspNetCore.Components.Route("contextapi/transformer")]
    public class TransformerController : ControllerBase
    {
        private readonly ITransformerRepository transformerRepository;

        public TransformerController(ITransformerRepository transformerRepository)
        {
            this.transformerRepository = transformerRepository;
        }

        [HttpGet]
        [Microsoft.AspNetCore.Mvc.Route("{feederId}")]
        public async Task<IActionResult> Get(int feederId)
        {
            return this.Ok(await transformerRepository.GetTransformersAsync(feederId));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TransformerDto transformer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await transformerRepository.AddTransformerAsync(transformer);
            return Created("contextapi/transformer", transformer);
        }
    }
}
