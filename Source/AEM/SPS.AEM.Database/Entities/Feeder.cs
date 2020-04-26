using System;
using System.Collections.Generic;
using System.Text;

namespace SPS.AEM.Database.Entities
{
    public class Feeder
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int SectionId { get; set; }

        public virtual Section Section { get; set; }

        public virtual  ICollection<Transformer> Transformers { get; set; }
    }
}
