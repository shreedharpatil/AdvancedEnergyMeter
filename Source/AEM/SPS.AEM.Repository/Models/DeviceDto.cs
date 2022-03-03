namespace SPS.AEM.Repository.Models
{
    public class DeviceDto
    {
        public string DeviceId { get; set; }

        public string HubConnectionString => $"HostName={FullyQualifiedHubName};DeviceId={DeviceId};SharedAccessKey={DeviceKey}";

        public string FullyQualifiedHubName { get; set; }

        public string DeviceKey { get; set; }
    }
}
