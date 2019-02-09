using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BankServices.Models
{
    public class AccountTypeDto
    {
        public int id { get; set; }
        public string accounttype { get; set; }
        public string accountdesc1 { get; set; }
        public string accountdesc2 { get; set; }
    }
}