using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SPS.AEM.Database.Contexts;
using SPS.AEM.Database.Entities;
using SPS.AEM.Repository.Implementations;
using SPS.AEM.Repository.Interfaces;
using SPS.AEM.Web.Commands;
using SPS.AEM.Web.Hub;

namespace SPS.AEM.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AemDatabaseContext>(options => options.UseSqlServer(Configuration["ConnectionStrings:Aem"], b => b.MigrationsAssembly("SPS.AEM.Web")));
            services.AddControllers();
            var allowedOrigins = Configuration["Settings:AllowedOrigins"].Split(',');
            services.AddCors(c =>
            {
                c.AddPolicy("AllowOrigin", options => options.AllowAnyHeader().AllowAnyMethod().WithOrigins(allowedOrigins).AllowCredentials());
            });

            services.AddSignalR();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<ICustomerRepository, CustomerRepository>();
            services.AddTransient<ILoadTypeRepository, LoadTypeRepository>();
            services.AddTransient<IDistrictRepository, DistrictRepository>();
            services.AddTransient<ITalukaRepository, TalukaRepository>();
            services.AddTransient<IVillageRepository, VillageRepository>();
            services.AddTransient<IStationRepository, StationRepository>();
            services.AddTransient<ISectionRepository, SectionRepository>();
            services.AddTransient<IFeederRepository, FeederRepository>();
            services.AddTransient<ITransformerRepository, TransformerRepository>();
            services.AddTransient<IDeviceRepository, DeviceRepository>();
            services.AddTransient<IProvisionDeviceCommandHandler, ProvisionDeviceCommandHandler>();
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseHttpsRedirection();

            app.UseRouting();

            //app.UseAuthorization();
            app.UseCors("AllowOrigin");
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<AemHub>("/aem");
                endpoints.MapControllers();
            });
        }
    }
}
