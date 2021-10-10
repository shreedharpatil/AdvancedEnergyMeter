using System;
using System.ComponentModel;
using System.Configuration;
using System.Net.Http;
using System.Text;
using System.Threading;
using Microsoft.Azure.Devices;
using Microsoft.Azure.Devices.Client;
using Newtonsoft.Json;
using SPS.AEM.Shared;
using Message = Microsoft.Azure.Devices.Client.Message;

namespace SPS.AEM.SimulatorDevice
{
    class Program
    {
        private static DeviceClient deviceClient;
        private static string deviceId = "";
        private static string connectionString = "";
        static void Main(string[] args)
        {
            if (args.Length == 0)
            {
                Console.WriteLine("Please pass RRNo as argument. Exiting app.");
                return;
            }

            var rrno = args[0];
            Console.WriteLine($"Device Id: {rrno}");
            var uri = string.Format(ConfigurationManager.AppSettings["DeviceApiUrl"], rrno);
            using var httpclient = new HttpClient();
            for (int i = 0; i < 5; i++)
            {
                Console.WriteLine($"-----Sending request to retrieve device details for device: {rrno}------");
                var deviceRequestTask = httpclient.GetAsync(uri);
                deviceRequestTask.Wait();
                var response = deviceRequestTask.Result;
                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"------No details found for device: {rrno}. Trying again in 30 sec-------");
                    Thread.Sleep(30000);
                    continue;
                }

                var result = new { deviceId = "", hubConnectionString = "" };
                var data = JsonConvert.DeserializeAnonymousType(response.Content.ReadAsStringAsync().Result, result);
                Console.WriteLine($"Received device details. connectionString: {connectionString}");
                deviceId = data.deviceId;
                connectionString = data.hubConnectionString;
                break;
            }

            if (string.IsNullOrWhiteSpace(deviceId) && string.IsNullOrWhiteSpace(connectionString))
            {
                Console.WriteLine("Attempted 5 times to retrieve details of device but couldn't found. Please make sure device is provisioned and try again.");
                Console.WriteLine("Press any key to exit");
                Console.ReadKey();
                return;
            }

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
            var data = new EventData { EventType = command, DeviceId = deviceId };
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
            else
            {
                data.Payload = "Unknown command.";
            }

            return data;
        }
    }
}
