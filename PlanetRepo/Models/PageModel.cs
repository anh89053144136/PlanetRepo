using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanetRepo.Models
{
    public class PageModel<T>
    {
        public IEnumerable<T> records { set; get; }

        public int recordCount { set; get; }
    }
}
