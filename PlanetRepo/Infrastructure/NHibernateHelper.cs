using System;
using System.Web;
using NHibernate;
using NHibernate.Cfg;

namespace PlanetRepo.Infrastructure
{
    public class NHibernateHelper
    {
        private const string CurrentSessionKey = "nhibernate.current_session";
        private static ISessionFactory _sessionFactory;
        private Microsoft.AspNetCore.Http.HttpContext context;
        
        public int id { set; get; }

        public NHibernateHelper(Microsoft.AspNetCore.Http.IHttpContextAccessor httpContextAccessor)
        {
            _sessionFactory = new Configuration().Configure().BuildSessionFactory();
            this.context = httpContextAccessor.HttpContext;
            id = new Random().Next(1, 10);
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
