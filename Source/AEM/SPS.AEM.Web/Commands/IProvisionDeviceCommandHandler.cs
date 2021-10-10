using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPS.AEM.Web.Commands
{
    public interface IProvisionDeviceCommandHandler
    {
        public Task<string> ProvisionDevice(int customerId);
    }
}
