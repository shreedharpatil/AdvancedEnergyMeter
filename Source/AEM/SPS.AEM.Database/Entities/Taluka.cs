using System;
using System.Collections.Generic;
using System.Text;

namespace SPS.AEM.Database.Entities
{
    public class Taluka
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int DistrictId { get; set; }

        public virtual District District { get; set; }

        public virtual ICollection<Village> Villages { get; set; }

        public virtual ICollection<Station> Stations { get; set; }
    }
}
