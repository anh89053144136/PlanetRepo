using System;
using System.Web;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
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
            _sessionFactory = Fluently.Configure()
             .Database(MsSqlConfiguration.MsSql2012.ConnectionString(@"Server=.;Database=PlanetRepo;User Id=PlanetRepoUser;Password=123;"))
             .Mappings(m => m.FluentMappings.AddFromAssemblyOf<NHibernate.Cfg.Mappings>())
             .BuildSessionFactory();

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
