using System;
using System.Linq;
using System.Reflection;
using FluentMigrator.Runner;
using FluentMigrator.Runner.Initialization;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PlanetRepo.Entities;

namespace PlanetRepoTests
{
    [TestClass]
    public class DBCreator
    {
        [TestMethod]
        public void TestMethod1()
        {
            var serviceProvider = CreateServices();

            using (var scope = serviceProvider.CreateScope())
            {
                UpdateDatabase(scope.ServiceProvider);
            }
        }

        private IServiceProvider CreateServices()
        {
            return new ServiceCollection()
                .AddFluentMigratorCore()
                .ConfigureRunner(rb => rb
                    .AddSqlServer2016()
                    .WithGlobalConnectionString("Server=.;Database=PlanetRepo;User Id=PlanetRepoUser;Password=123;")
                    .ScanIn(typeof(PlanetRepo.Program).Assembly).For.Migrations())
                .AddLogging(lb => lb.AddFluentMigratorConsole())
                .BuildServiceProvider(false);
        }

        /// <summary>
        /// Update the database
        /// </sumamry>
        private void UpdateDatabase(IServiceProvider serviceProvider)
        {
            var runner = serviceProvider.GetRequiredService<IMigrationRunner>();
            runner.MigrateUp();
        }

        [TestMethod]
        public void FillBytestData()
        {
            Planet[] planets = new Planet[] {
                new Planet() { name= "Mercury", lastVisitDate= new DateTime(2004, 1, 1), radius= 2439.7 },
                new Planet() { name= "Venus", lastVisitDate= new DateTime(1970, 1, 1), radius= 6051.8 },
                new Planet() { name= "Earth", lastVisitDate= null, radius= 6371.8 },
                new Planet() { name= "Mars", lastVisitDate= new DateTime(1980, 1, 1), radius= 3389.5 },
                new Planet() { name= "Saturn", lastVisitDate= new DateTime(2009, 7, 11), radius= 58232 },
                new Planet() { name= "Jupiter", lastVisitDate= new DateTime(1997, 9, 15), radius= 69911 },
                new Planet() { name= "Uranus", lastVisitDate= new DateTime(1986, 1, 17), radius= 0 },
                new Planet() { name= "Neptune", lastVisitDate= new DateTime(1989, 7, 1), radius= 24622 },
                new Planet() { name= "PSR 1257+12", lastVisitDate= new DateTime(1989, 7, 1), radius= 24622 },
                new Planet() { name= "GJ 1214 b", lastVisitDate= new DateTime(1989, 7, 1), radius= 24622 },
                new Planet() { name= "Kepler-10 b", lastVisitDate= new DateTime(1989, 7, 1), radius= 24622 },
                new Planet() { name= "Gliese 667 Cc", lastVisitDate= new DateTime(1989, 7, 1), radius= 24622 },
                new Planet() { name= "Gliese 581 d", lastVisitDate= new DateTime(1989, 7, 1), radius= 24622 },
                new Planet() { name= "Gliese 581 g", lastVisitDate= new DateTime(1989, 7, 1), radius= 24622 },
                new Planet() { name= "Kepler-20 e", lastVisitDate= new DateTime(1989, 7, 1), radius= 24622 },
                new Planet() { name= "HD 85512 b", lastVisitDate= new DateTime(1989, 7, 1), radius= 24622 },
                new Planet() { name= "Kepler-22 b", lastVisitDate= new DateTime(1989, 7, 1), radius= 24622 },
                new Planet() { name= "GD 66 b", lastVisitDate= new DateTime(1989, 7, 1), radius= 24622 },
                new Planet() { name= "HD 188753 Ab", lastVisitDate= new DateTime(1989, 7, 1), radius= 24622 }
            };

            var _sessionFactory = Fluently.Configure()
             .Database(MsSqlConfiguration.MsSql2012.ConnectionString(@"Server=.;Database=PlanetRepo;User Id=PlanetRepoUser;Password=123;"))
             .Mappings(m => m.FluentMappings.AddFromAssemblyOf<NHibernate.Cfg.Mappings>())
             .Mappings(m => m.FluentMappings.AddFromAssemblyOf<PlanetRepo.Program>())
             .BuildSessionFactory();

            var session = _sessionFactory.OpenSession();

            foreach (Planet planet in planets)
            {
                session.Save(planet);
            }

            session.Close();
        }
    }
}
