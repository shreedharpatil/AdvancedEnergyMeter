﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using SPS.AEM.Repository.Models;

namespace SPS.AEM.Repository.Interfaces
{
    public interface ITransformerRepository
    {
        Task<IEnumerable<TransformerDto>> GetTransformersAsync(int feederId);

        Task AddTransformerAsync(TransformerDto trnTransformer);
    }
}
