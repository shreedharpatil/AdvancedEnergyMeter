using System;
using System.Collections.Generic;
using System.Text;

namespace SPS.AEM.Database.Entities
{
    public class District
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public virtual ICollection<Taluka> Talukas { get; set; }

        public virtual ICollection<Station> Stations { get; set; }
    }
}
