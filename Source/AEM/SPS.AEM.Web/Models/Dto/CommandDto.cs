﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SPS.AEM.Web.Models.Dto
{
    public class CommandDto
    {
        [Required]
        public string Command { get; set; }

        [Required]
        public string RRNo { get; set; }
    }
}
