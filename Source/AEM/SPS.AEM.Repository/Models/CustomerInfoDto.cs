using System;
using System.Collections.Generic;
using System.Text;

namespace SPS.AEM.Repository.Models
{
    public class CustomerInfoDto : CustomerDto
    {
        public string LoadType { get; set; }

        public string Transformer { get; set; }

        public string Village { get; set; }
    }
}
