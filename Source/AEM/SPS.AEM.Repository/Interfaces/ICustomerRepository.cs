using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using SPS.AEM.Database.Entities;
using SPS.AEM.Repository.Models;

namespace SPS.AEM.Repository.Interfaces
{
    public interface ICustomerRepository
    {
        Task<IEnumerable<CustomerDto>> GetAllCustomersAsync();

        Task<CustomerDto> GetCustomerByIdAsync(int id);

        Task AddCustomerAsync(CustomerDto customer);
    }
}