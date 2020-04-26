using System;
using System.Collections.Generic;
using System.Text;

namespace SPS.AEM.Database.Entities
{
    public class Section
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int StationId { get; set; }

        public virtual Station Station { get; set; }

        public virtual ICollection<Feeder> Feeders { get; set; }
    }
}
