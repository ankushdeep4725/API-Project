using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EBankingMain.Controllers
{
    public class Demo
    {
        public string name { get; set; }
    }

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ValuesController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetAll()
        {
            List<Demo> regionList = new List<Demo>();
            regionList.Add(new Demo() { name = "UK" });
            regionList.Add(new Demo() { name = "UK1" });
            
            return Ok(regionList.ToList());
        }

        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
