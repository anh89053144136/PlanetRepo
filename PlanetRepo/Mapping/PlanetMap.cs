using FluentNHibernate.Mapping;
using PlanetRepo.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PlanetRepo.Mapping
{
    public class PlanetMap : ClassMap<Planet>
    {
        public PlanetMap()
        {
            Id(x => x.id);

            Map(x => x.name);
            Map(x => x.lastVisitDate);
            Map(x => x.radius);
        }
    }
}
