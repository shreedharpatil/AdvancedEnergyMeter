using System.Collections.Generic;

namespace SPS.AEM.Database.Entities
{
    public class LoadType
    {
        public int Id { get; set; }

        public string Type { get; set; }

        public virtual ICollection<Customer> Customers { get; set; }
    }
}
