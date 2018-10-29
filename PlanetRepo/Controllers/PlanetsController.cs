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

        [HttpPost("[action]")]
        public ActionStatus save([FromBody] Planet planet)
        {
            try
            {
                if (planet.id > 0)
                {
                    helper.GetCurrentSession().Update(planet);
                }
                else
                {
                    helper.GetCurrentSession().Save(planet);
                }

                return new ActionStatus() { Message = planet.id.ToString(), ResultCode = ResultCode.Ok };
            }
            catch (Exception ex)
            {
                return new ActionStatus() { Message = ex.Message, ResultCode = ResultCode.Fail };
            }
        }

        [HttpDelete("[action]/{id?}")]
        public ActionStatus Delete(int id)
        {
            var session = helper.GetCurrentSession();
            try
            {
                var obj = session.Query<Planet>().FirstOrDefault(x => x.id == id);
                session.Delete(obj);
                session.Flush();
            }
            catch (Exception ex)
            {
                return new ActionStatus() { Message = ex.Message, ResultCode = ResultCode.Fail };
            }

            return new ActionStatus() { ResultCode = ResultCode.Ok };
        }
    }
}