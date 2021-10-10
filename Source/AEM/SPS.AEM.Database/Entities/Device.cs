using System;
using System.Collections.Generic;
using System.Text;

namespace SPS.AEM.Database.Entities
{
    public class Device
    {
        public string RRNo { get; set; }

        public string DeviceId { get; set; }

        public string HubName { get; set; }

        public DateTime RegisteredDateTime { get; set; }

        public string Status { get; set; }
    }
}
