using System;
using System.Collections.Generic;
using System.Text;

namespace SPS.AEM.Database.Entities
{
    public class Station
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int DistrictId { get; set; }

        public int TalukaId { get; set; }

        public int VillageId { get; set; }

        public virtual District District { get; set; }

        public virtual  Taluka Taluka { get; set; }

        public virtual Village Village { get; set; }

        public virtual ICollection<Section> Sections { get; set; }
    }
}
