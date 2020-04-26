using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SPS.AEM.Repository.Models
{
    public class DistrictDto
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
