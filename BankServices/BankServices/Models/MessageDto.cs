using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BankServices.Models
{
    public class MessageDto
    {
        public string name { get; set; }
        public string email { get; set; }
        public string subject { get; set; }
        public string message { get; set; }
        public string messageType { get; set; }

    }
}