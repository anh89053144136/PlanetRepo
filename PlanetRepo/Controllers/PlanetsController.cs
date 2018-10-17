using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PlanetRepo.Entities;
using PlanetRepo.Models;
using PlanetRepo.Infrastructure;
using Microsoft.AspNetCore.Http;

namespace PlanetRepo.Controllers
{
    [Route("api/[controller]")]
    public class PlanetsController : Controller
    {
        private NHibernateHelper helper;

        public PlanetsController(NHibernateHelper helper)
        {
            this.helper = helper;
        }

        [HttpGet("[action]/{id?}")]
        public Planet Get(int id) => helper.GetCurrentSession().Query<Planet>().FirstOrDefault(x => x.id == id);

        [HttpGet("[action]")]
        public PageModel<Planet> List(string orderBy, string order, int page, int rowsPerPage)
        {
            var session = helper.GetCurrentSession();
            var allPlanets = session.Query<Planet>();

            return new PageModel<Planet>() {
                records = allPlanets.ApplyOrder(orderBy, order).Skip(page * rowsPerPage).Take(rowsPerPage),
                recordCount = allPlanets.Count()
            };
        }
    }
}