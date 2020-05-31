using Microsoft.Azure.Devices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SPS.AEM.Shared;

namespace SPS.AEM.CloudToDeviceSender
{
    class Program
    {
        static void Main(string[] args)
        {
            Dictionary<string, string> commands = new Dictionary<string, string>
            {
                { "R", EventType.Reading.ToString() },
                { "B", EventType.BlockDevice.ToString() },
                { "U", EventType.UnblockDevice.ToString()}
            };
            string connectionString = "HostName=SPS-AEM-DEV-EVENTHUB.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=X0elD7P0XElDZrw827wgaLSeSW1ej/gy4khjrHVrpSc=";
            string deviceId = "MyFirstIoTHubDevice";
            var serviceClient = ServiceClient.CreateFromConnectionString(connectionString);
            try
            {
                do
                {
                    var commandMessage = new Message();
                    Console.WriteLine("R -> Reading, B-> Block device, U -> UnblockDevice");
                    var input = Console.ReadLine();
                    commandMessage.Properties.Add(new KeyValuePair<string, string>("Command", commands[input]));
                    commandMessage.Ack = DeliveryAcknowledgement.Full;
                    serviceClient.SendAsync(deviceId, commandMessage).Wait();
                    Console.WriteLine("1 -> Send another command, 2 -> stop");
                } while (Console.ReadLine() == "1");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            
            
            Console.WriteLine("Press any key to exit");
            serviceClient?.Dispose();
            Console.ReadLine();
        }
    }
}
