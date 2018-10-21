using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanetRepo.Models
{
    public class ActionStatus
    {
        public ResultCode ResultCode { set; get; }
        public string Message { set; get; }
    }

    public enum ResultCode
    {
        Ok = 1,
        Fail = 2
    }
}
