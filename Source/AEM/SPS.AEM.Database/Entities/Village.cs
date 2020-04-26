using System;
using System.Collections.Generic;
using System.Text;

namespace SPS.AEM.Database.Entities
{
    public class Village
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int TalukaId { get; set; }

        public virtual Taluka Taluka { get; set; }

        public virtual ICollection<Station> Stations { get; set; }
    }
}
