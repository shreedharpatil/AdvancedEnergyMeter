using System;
using System.ComponentModel;
using System.Text;
using Microsoft.Azure.Devices.Client;
using Newtonsoft.Json;
using SPS.AEM.Shared;

namespace SPS.AEM.DeviceToCloudSender
{
    class Program
    {
        private static DeviceClient deviceClient;
        private static string deviceId = "MyFirstIoTHubDevice";
        static void Main(string[] args)
        {
            var connectionString =
                "HostName=SPS-AEM-DEV-EVENTHUB.azure-devices.net;DeviceId=MyFirstIoTHubDevice;SharedAccessKey=/xmy6+NNjqGg/Qn5iLQFMaQ9/M+YOCjWbDLnpAGYchM=";
            deviceClient = DeviceClient.CreateFromConnectionString(connectionString);
            var backgroundWorker = new BackgroundWorker();
            backgroundWorker.DoWork += ReceiveMessageFromCloud;
            backgroundWorker.RunWorkerAsync();
            try
            {
                var input = "";
                do
                {
                    var eventData = new EventData
                    {
                        DeviceId = deviceId,
                        Payload = $"Sample message sent from device {deviceId} to cloud at {DateTime.Now}",
                        EventType = "Event"
                    };
                    var message = JsonConvert.SerializeObject(eventData);
                    Console.WriteLine($"Sending message to cloud: {message}");
                    var task = deviceClient.SendEventAsync(new Message(Encoding.UTF8.GetBytes(message)));
                    task.Wait();
                    Console.WriteLine("Message Sent to cloud successfully.");
                    Console.WriteLine("s -> send another message, e -> stop");
                    input = Console.ReadLine();
                } while (input == "s");
                
            }
            catch (Exception e)
            {
                // deviceClient?.Dispose();
                Console.WriteLine(e);
            }
            
            Console.WriteLine("Press any key to close");
            deviceClient?.Dispose();
            Console.ReadKey();
        }

        private static async void ReceiveMessageFromCloud(object sender, DoWorkEventArgs e)
        {
            while (true)
            {
                
                var message = await deviceClient.ReceiveAsync();

                // Check if message was received
                if (message == null)
                {
                    continue;
                }

                try
                {
                    Console.WriteLine($"Command Received: {message.Properties["Command"]}");
                    var messageToSend = JsonConvert.SerializeObject(BuildResponse(message.Properties["Command"]));
                    Console.WriteLine($"Sending response: {messageToSend}");
                    await deviceClient.CompleteAsync(message);
                    Console.WriteLine("CompleteAsync Done");
                    await deviceClient.SendEventAsync(new Message(Encoding.UTF8.GetBytes(messageToSend)));
                    Console.WriteLine("Response sent");
                }
                catch (Exception exception)
                {
                    Console.WriteLine(exception);
                    await deviceClient.RejectAsync(message);
                }
            }
        }

        private static EventData BuildResponse(string command)
        {
            var data = new EventData{  EventType = command, DeviceId = deviceId};
            if (command == EventType.Reading.ToString())
            {
                data.Payload = new Random().Next(1000).ToString();
            }
            else if (command == EventType.BlockDevice.ToString())
            {
                data.Payload = "Device blocked";
            }
            else if (command == EventType.UnblockDevice.ToString())
            {
                data.Payload = "Device unblocked";
            }

            return data;
        }
    }
}
