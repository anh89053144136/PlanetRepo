using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanetRepo.Entities
{
    public class Planet
    {
        public virtual int id { set; get; }
        public virtual string name { set; get; }
        public virtual DateTime? lastVisitDate { set; get; }
        public virtual double radius { set; get; }
    }
}
