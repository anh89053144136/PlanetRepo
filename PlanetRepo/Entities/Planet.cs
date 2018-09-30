using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanetRepo.Entities
{
    public class Planet
    {
        public int id { set; get; }
        public string name { set; get; }
        public DateTime? lastVisitDate { set; get; }
        public double radius { set; get; }
    }
}
