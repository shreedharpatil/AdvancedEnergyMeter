using System;
using Microsoft.ServiceBus.Messaging;

namespace SPS.AEM.MessageReader
{
    class Program
    {
        static void Main(string[] args)
        {
            string eventHubConnectionString = "Endpoint=sb://ihsuprodhkres002dednamespace.servicebus.windows.net/;SharedAccessKeyName=iothubowner;SharedAccessKey=7zAl+mPyK+qu5KqJizsOd8OuIPKBUuktUOUCyQqq9fc=";
            string eventHubName = "iothub-ehub-sps-aem-de-3534148-213dfb35c2";
            string storageAccountName = "spsaemeventhub";
            string storageAccountKey = "Mk5ktK1aB7t+JeccoPgAKw1HtRWpQM2L8mSQyuCmNlc6V2ZRfd+Zd1VF+qRlM6LiiIa8p2Fy82M66LKEy+9IoQ==";
            string storageConnectionString = string.Format("DefaultEndpointsProtocol=https;AccountName={0};AccountKey={1}", storageAccountName, storageAccountKey);

            string eventProcessorHostName = Guid.NewGuid().ToString();
            EventProcessorHost eventProcessorHost = new EventProcessorHost(eventProcessorHostName, eventHubName, EventHubConsumerGroup.DefaultGroupName, eventHubConnectionString, storageConnectionString);
            try
            {   
                Console.WriteLine("Registering EventProcessor...");
                var options = new EventProcessorOptions();
                options.ExceptionReceived += (sender, e) => { Console.WriteLine(e.Exception); };
                eventProcessorHost.RegisterEventProcessorAsync<SimpleEventProcessor>(options).Wait();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            

            Console.WriteLine("Receiving. Press enter key to stop worker.");
            Console.ReadLine();
            eventProcessorHost.UnregisterEventProcessorAsync().Wait();
        }
    }
}
