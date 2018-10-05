using System;
using System.Web;
using NHibernate;
using NHibernate.Cfg;

namespace PlanetRepo.Infrastructure
{
    public class NHibernateHelper
    {
        private static readonly ISessionFactory _sessionFactory = new Configuration().Configure().BuildSessionFactory();
        private ISession currentSession;
        private Microsoft.AspNetCore.Http.HttpContext context;

        public NHibernateHelper(Microsoft.AspNetCore.Http.HttpContext context)
        {
            this.context = context;
        }

        public ISession GetCurrentSession()
        {
            currentSession = _sessionFactory.OpenSession();

            return currentSession;
        }

        public void CloseSession()
        {
            if (currentSession == null)
            {
                return;
            }

            currentSession.Close();
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
