﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using SPS.AEM.Repository.Models;

namespace SPS.AEM.Repository.Interfaces
{
    public interface IDistrictRepository
    {
        Task<IEnumerable<DistrictDto>> GetAllDistrictsAsync();
    }
}
