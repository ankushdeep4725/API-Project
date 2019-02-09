using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BankServices.Models
{
    public class AdminUsersDto
    {
        public int id { get; set; }
        public string userName { get; set; }
        public string password { get; set; }
    }
}