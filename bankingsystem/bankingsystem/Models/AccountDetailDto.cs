using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EBankingMain.Models
{
    public class AccountDetailDto
    {
        public string type { get; set; }
        public int id { get; set; }
        public string title { get; set; }
        public string para1 { get; set; }
        public string para2 { get; set; }
        public string heading { get; set; }
        
    }
}