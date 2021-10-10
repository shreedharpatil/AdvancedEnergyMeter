using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.Azure.Devices.Provisioning.Client;
using Microsoft.Azure.Devices.Provisioning.Client.Transport;
using Microsoft.Azure.Devices.Shared;
using Microsoft.Extensions.Configuration;
using SPS.AEM.Database.Entities;
using SPS.AEM.Repository.Interfaces;

namespace SPS.AEM.Web.Commands
{
    public class ProvisionDeviceCommandHandler : IProvisionDeviceCommandHandler
    {
        private readonly ICustomerRepository customerRepository;
        private readonly IDeviceRepository deviceRepository;
        private readonly IConfiguration configuration;

        public ProvisionDeviceCommandHandler(ICustomerRepository customerRepository, IDeviceRepository deviceRepository, IConfiguration configuration)
        {
            this.customerRepository = customerRepository;
            this.deviceRepository = deviceRepository;
            this.configuration = configuration;
        }

        public async Task<string> ProvisionDevice(int customerId)
        {
            var customer = await customerRepository.GetCustomerByIdAsync(customerId);
            if (customer == null)
            {
                return "Invalid customer Id. Please check and try again.";
            }

            var deviceIdentifier = customer.RRNumber;
            var device = await deviceRepository.GetByIdAsync(deviceIdentifier);
            if (device != null)
            {
                return "Device already provisioned.";
            }

            var deviceRegistrationResult = await RegisterDevice(Guid.NewGuid().ToString().ToLower());
            if (!string.IsNullOrEmpty(deviceRegistrationResult.AssignedHub))
            {
                var newDevice = new Device()
                {
                    RRNo = deviceIdentifier,
                    DeviceId = deviceRegistrationResult.DeviceId,
                    HubName = deviceRegistrationResult.AssignedHub,
                    RegisteredDateTime = DateTime.Now,
                    Status = "Provisioned"
                };

                await deviceRepository.SaveAsync(newDevice);
                return "Device provisioned successfully";
            }

            return $"Failed to provision the device. ErrorCode: {deviceRegistrationResult.ErrorCode}, ErrorMessage: {deviceRegistrationResult.ErrorMessage}";
        }

        private async Task<DeviceRegistrationResult> RegisterDevice(string deviceRegistrationId)
        {
            // using symmetric keys
            using var securityProvider = new SecurityProviderSymmetricKey(
                registrationId: deviceRegistrationId,
                primaryKey: ComputeKeyHash(configuration["Settings:EnrollmentGroupPrimaryKey"], deviceRegistrationId),
                secondaryKey: ComputeKeyHash(configuration["Settings:EnrollmentGroupSecondaryKey"], deviceRegistrationId));

            // Amqp transport
            using var transportHandler = new ProvisioningTransportHandlerAmqp(TransportFallbackType.TcpOnly);

            // set up provisioning client for given device
            var provisioningDeviceClient = ProvisioningDeviceClient.Create(
                globalDeviceEndpoint: configuration["Settings:DpsGlobalDeviceEndpoint"],
                idScope: configuration["Settings:DpsIdScope"],
                securityProvider: securityProvider,
                transport: transportHandler);

            // register device
            return await provisioningDeviceClient.RegisterAsync();
        }

        private static string ComputeKeyHash(string key, string payload)
        {
            using var hmac = new HMACSHA256(Convert.FromBase64String(key));

            return Convert.ToBase64String(hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(payload)));
        }
    }
}
