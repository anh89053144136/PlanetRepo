using Castle.Windsor;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PlanetRepo.Infrastructure;
using System;
using Castle.Windsor;
using Castle.Windsor.MsDependencyInjection;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.MicroKernel.Registration;
using Microsoft.AspNetCore.Http;

namespace PlanetRepo
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        private static readonly WindsorContainer container = new WindsorContainer();

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            //services.AddDbContext<ApplicationContext>(opts => opts.UseSqlServer(Configuration["Data:DefaultConnection:ConnectionString"]));
            //services.AddHttpClient<NHibernateHelper>();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            //PerWebRequest;
            container.Register(Component.For<NHibernateHelper>().ImplementedBy<NHibernateHelper>().LifestyleSingleton());

            //Install-Package Castle.Windsor.MsDependencyInjection
            return WindsorRegistrationHelper.CreateServiceProvider(container, services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });
            
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
