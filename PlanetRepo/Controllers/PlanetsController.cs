using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PlanetRepo.Entities;
using PlanetRepo.Models;

namespace PlanetRepo.Controllers
{
    [Route("api/[controller]")]
    public class PlanetsController : Controller
    {
        private static Planet[] planets = new Planet[] {
            new Planet() { id= 1, name= "Mercury", lastVisitDate= new DateTime(2004, 1, 1), radius= 2439.7 },
            new Planet() { id= 2, name= "Venus", lastVisitDate= new DateTime(1970, 1, 1), radius= 6051.8 },
            new Planet() { id= 3, name= "Earth", lastVisitDate= null, radius= 6371.8 },
            new Planet() { id= 4, name= "Mars", lastVisitDate= new DateTime(1980, 1, 1), radius= 3389.5 },
            new Planet() { id= 5, name= "Saturn", lastVisitDate= new DateTime(2009, 7, 11), radius= 58232 },
            new Planet() { id= 6, name= "Jupiter", lastVisitDate= new DateTime(1997, 9, 15), radius= 69911 },
            new Planet() { id= 7, name= "Uranus", lastVisitDate= new DateTime(1986, 1, 17), radius= 0 },
            new Planet() { id= 8, name= "Neptune", lastVisitDate= new DateTime(1989, 7, 1), radius= 24622 },
            new Planet() { id= 9, name= "PSR 1257+12", lastVisitDate= new DateTime(1989, 7, 1), radius= 24622 },
            new Planet() { id= 10, name= "GJ 1214 b", lastVisitDate= new DateTime(1989, 7, 1), radius= 24622 },
            new Planet() { id= 11, name= "Kepler-10 b", lastVisitDate= new DateTime(1989, 7, 1), radius= 24622 },
            new Planet() { id= 12, name= "Gliese 667 Cc", lastVisitDate= new DateTime(1989, 7, 1), radius= 24622 },
            new Planet() { id= 13, name= "Gliese 581 d", lastVisitDate= new DateTime(1989, 7, 1), radius= 24622 },
            new Planet() { id= 14, name= "Gliese 581 g", lastVisitDate= new DateTime(1989, 7, 1), radius= 24622 },
            new Planet() { id= 15, name= "Kepler-20 e", lastVisitDate= new DateTime(1989, 7, 1), radius= 24622 },
            new Planet() { id= 16, name= "HD 85512 b", lastVisitDate= new DateTime(1989, 7, 1), radius= 24622 },
            new Planet() { id= 17, name= "Kepler-22 b", lastVisitDate= new DateTime(1989, 7, 1), radius= 24622 },
            new Planet() { id= 18, name= "GD 66 b", lastVisitDate= new DateTime(1989, 7, 1), radius= 24622 },
            new Planet() { id= 19, name= "HD 188753 Ab", lastVisitDate= new DateTime(1989, 7, 1), radius= 24622 }
        };

        [HttpGet("[action]")]
        public PageModel<Planet> List(string orderBy, string order, int page, int rowsPerPage)
        {
            return new PageModel<Planet>() {
                records = planets.Skip(page * rowsPerPage).Take(rowsPerPage),
                recordCount = planets.Count()
            };
        }
    }
}