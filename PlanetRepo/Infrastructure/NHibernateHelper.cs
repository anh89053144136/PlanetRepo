using System;
using System.Web;
using NHibernate;
using NHibernate.Cfg;
using NHibernate.Dialect;
using NHibernate.Driver;

namespace PlanetRepo.Infrastructure
{
    public class NHibernateHelper
    {
        private const string CurrentSessionKey = "nhibernate.current_session";
        private static ISessionFactory _sessionFactory;
        private Microsoft.AspNetCore.Http.HttpContext context;
        
        public string id {
            get
            {
                return (context.Items[CurrentSessionKey] as ISession).ToString();
            }
        }

        public NHibernateHelper(Microsoft.AspNetCore.Http.IHttpContextAccessor httpContextAccessor)
        {
            Configuration configuration = new Configuration();
            configuration.DataBaseIntegration(db =>
            {
                db.ConnectionString = @"Server=.;Database=PlanetRepo;User Id=PlanetRepoUser;Password=123;";
                db.Dialect<MsSql2008Dialect>();
                db.Driver<Sql2008ClientDriver>();
            });
            //.AddMapping(domainMapping);
            configuration.SessionFactory().GenerateStatistics();

            _sessionFactory = configuration.BuildSessionFactory();
            this.context = httpContextAccessor.HttpContext;
        }

        public ISession GetCurrentSession()
        {
            var currentSession = context.Items[CurrentSessionKey] as ISession;

            if (currentSession == null)
            {
                currentSession = _sessionFactory.OpenSession();
                context.Items[CurrentSessionKey] = currentSession;
            }

            return currentSession;
        }

        public void CloseSession()
        {
            var currentSession = context.Items[CurrentSessionKey] as ISession;

            if (currentSession == null)
            {
                // No current session
                return;
            }

            currentSession.Close();
            context.Items.Remove(CurrentSessionKey);
        }

        public void CloseSessionFactory()
        {
            if (_sessionFactory != null)
            {
                _sessionFactory.Close();
            }
        }
    }
}
