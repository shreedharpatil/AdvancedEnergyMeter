using System;
using System.Collections.Generic;
using System.Text;

namespace SPS.AEM.Database.Entities
{
    public class Transformer
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int FeederId { get; set; }

        public virtual Feeder Feeder { get; set; }
    }
}
