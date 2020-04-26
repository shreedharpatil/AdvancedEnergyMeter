using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SPS.AEM.Repository.Interfaces;
using SPS.AEM.Repository.Models;

namespace SPS.AEM.Web.Controllers
{
    [ApiController]
    [Route("contextapi/customer")]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerRepository customerRepository;

        public CustomerController(ICustomerRepository customerRepository)
        {
            this.customerRepository = customerRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return this.Ok(await customerRepository.GetAllCustomersAsync());
        }

        [HttpGet]
        [Microsoft.AspNetCore.Mvc.Route("{customerId}")]
        public async Task<IActionResult> Get(int customerId)
        {
            return this.Ok(await customerRepository.GetCustomerByIdAsync(customerId));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CustomerDto customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await customerRepository.AddCustomerAsync(customer);
            return Created($"contextapi/customer/{customer.Id}", customer);
        }
    }
}
