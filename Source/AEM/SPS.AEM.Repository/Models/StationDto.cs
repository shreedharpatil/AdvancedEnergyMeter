using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SPS.AEM.Repository.Models
{
    public class StationDto
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int DistrictId { get; set; }

        [Required]
        public int TalukaId { get; set; }

        [Required]
        public int VillageId { get; set; }
    }
}
